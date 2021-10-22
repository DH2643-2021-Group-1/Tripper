import * as express from 'express';

import { auth, firestore } from 'firebase-admin';
import { db, storage } from '../db';
import { deleteImage, uploadImage } from './image-manager';

export enum EditType {
    none,
    delete,
    new,
    edited,
}

interface BlogPostDatabaseStructure {
    id: string,
    title: string,
    content: object,
    primaryImage: string,
    description: string,
    publicationDate: Date,
    userRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
}

const createBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const doc = await db.collection('blogposts').add({
            title: req.body.title,
            description: req.body.description,
            userRef: db.doc(`users/${req.body.userId}`),
            publicationDate: new Date().getTime(),
            primaryImage: ''
        });

        const content = JSON.parse(req.body.content);
        filterOutDeletedContentPieces(content);
        const files = req.files! as { [fieldname: string]: Express.Multer.File[] };
        const primaryImage = files['primaryImage'][0];
        const imagePieces = files['imagePieces'];

        const url = await uploadImage(primaryImage, `blogPostImages/${doc.id}.png`);
        const contentWithImageLinks = await uploadContentImagesAndSetImageUrls(content,imagePieces);

        await doc.update({
            primaryImage: url,
            content: contentWithImageLinks,
        })
        
        console.log('Added document with ID: ', doc.id);
        res.status(200).send(`New blogpost with doc id ${doc.id} written to database`)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const updateBlogPost = async (req: express.Request, res: express.Response) => {
    const existingBlogPost = await db.collection('blogposts').doc(req.body.id).get();
    
    const files = req.files! as { [fieldname: string]: Express.Multer.File[] };
    const primaryImage = files['primaryImage'];
    const imagePieces = files['imagePieces'];

    // Replace existing primary image if any exist
    if (primaryImage != null && existingBlogPost != null) {
        const primaryImagePath = `blogPostImages/${existingBlogPost.id}.png`;
        await deleteImage(primaryImagePath);
        const newImageUrl = await uploadImage(primaryImage[0], primaryImagePath);
        existingBlogPost.ref.update({
            primaryImagePath: newImageUrl
        })
    }

    const content = JSON.parse(req.body.content);     
    await removeDeletedImagesFromDatabase(content);
    filterOutDeletedContentPieces(content);
    const contentWithImageLinks = await uploadContentImagesAndSetImageUrls(content, imagePieces);
    await existingBlogPost.ref.update({
        title: req.body.title,
        description: req.body.description,
        content: contentWithImageLinks,
    });
    
    res.status(200).send(`Blog Post Updated`);
    try {
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const filterOutDeletedContentPieces = (content: any) => {
    content.contentPieces = content.contentPieces.filter((piece: any) => {
        return piece.editType != EditType.delete;
    });
}

const removeDeletedImagesFromDatabase = async (content: any) => {
    for (const piece of content.contentPieces) {
        if (piece.type == "image" && piece.editType == EditType.delete) {
            try {
                await deleteImage(`blogPostImages/${piece.id}.png`);
            } catch (error) {
                console.log("Note: Image already delete");
            }
        }
    }
}

const uploadContentImagesAndSetImageUrls = async (content: any, files: Express.Multer.File[]) => {
    let fileIndex = 0;
    for (const piece of content.contentPieces) {
        if (piece.type != "image") continue;

        const imagePieceHasNewFile = files != null && files[fileIndex] != null;
        if (!imagePieceHasNewFile) continue; 

        const url = await uploadImage(files[fileIndex], `blogPostImages/${piece.id}.png`);
        piece.imageUrl = url;
        fileIndex++;
    }
    return content;
}


/** Get the blog post from its Id */
const getBlogPostById = async (req: express.Request, res: express.Response) => {

    try {
        const responseArray: Object[] = [];
        const blogpostId = req.params.blogpostId;
        const blogPostSnapshot = await db.collection("blogposts").doc(blogpostId).get();
        responseArray.push(await populateBlogPostData(blogPostSnapshot))
        res.status(200).send(responseArray)
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

/** Returns all the blog post that the user owns */
const getBlogPostsFromUserId = async (req: express.Request, res: express.Response) => {
    const responseArray: Object[] = [];
    const userId = req.params.userId;
    const userRef = db.collection("users").doc(userId);
    const blogPostSnapshot = await db
        .collection("blogposts")
        .where("userRef", "==", userRef)
        .get();
    for (const doc of blogPostSnapshot.docs) {
        responseArray.push(await populateBlogPostData(doc));
    }
    res.status(200).send(responseArray);
}

/** Gets all the blog posts (Max 10) */
const getAllBlogPosts = async (req: express.Request, res: express.Response) => {
    try {
        const responseArray: Object[] = [];
        const blogpostCollection = db.collection('blogposts');
        const snapshot = await blogpostCollection.limit(10).get(); // ? orderBy(createdAt), ? set limit here or client?
        for (const doc of snapshot.docs) {
            responseArray.push(await populateBlogPostData(doc));
        }
        res.status(200).send(responseArray);
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

/** Internal function that populates blog post data with the authors data */
const populateBlogPostData = async (blogpostDocumentSnapshot: firestore.QueryDocumentSnapshot<firestore.DocumentData> | firestore.DocumentSnapshot<firestore.DocumentData>): Promise<any> => {
    const blogpostDocumentData = blogpostDocumentSnapshot.data() as BlogPostDatabaseStructure;
    const authorRef = blogpostDocumentData.userRef;
    const author = await authorRef.get();
    return {
        id: blogpostDocumentSnapshot.id,
        title: blogpostDocumentData.title,
        content: blogpostDocumentData.content,   // TODO : change to advanced structure
        description: blogpostDocumentData.description,
        primaryImage: blogpostDocumentData.primaryImage,
        publicationDate: blogpostDocumentData.publicationDate,
        author: {
            firstName: author.data()?.firstName,
            lastName: author.data()?.lastName,
            profilePicture: author.data()?.profilePicture,
            email: author.data()?.email
        }
    };
}

const editProfilePage = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const firstName = req.params.firstName;
        const lastName = req.params.lastName;
        const profilePicture = req.params.profilePicture;
        const biography = req.params.biography;
        const profileSnapshot = await db.collection('users').doc(userId).update({
            firstName: firstName,
            lastName: lastName,
            profilePicture: profilePicture,
            biography: biography
        })
        res.status(200).send(firstName + ' ' + lastName);
        //return profileSnapshot.data()?.firstName;
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

const getUserDetails = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const profileSnapshot = await db.collection('users').doc(userId).get();
        const user_data = [profileSnapshot.data()?.firstName, profileSnapshot.data()?.lastName, profileSnapshot.data()?.email, profileSnapshot.data()?.profilePicture, profileSnapshot.data()?.biography];

        res.status(200).send(user_data);
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

export {
    getBlogPostsFromUserId,
    getBlogPostById,
    getAllBlogPosts,
    updateBlogPost,
    createBlogPost as setBlogPost,
    editProfilePage,
    getUserDetails
}