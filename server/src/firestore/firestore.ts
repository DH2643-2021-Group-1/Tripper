import * as express from 'express';

import { auth, firestore } from 'firebase-admin';
import { db, storage } from '../db';
import { deleteImage, uploadImage } from './image-manager';

interface BlogPostDatabaseStructure {
    id: string,
    title: string,
    text: string,
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

        const url = await uploadImage(req.file, `blogPostImages/${doc.id}.png`);

        await doc.update({
            primaryImage: url
        })
        
        console.log('Added document with ID: ', doc.id);
        res.status(200).send(`New blogpost with doc id ${doc.id} written to database`)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const updateBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const existingBlogPost = await db.collection('blogposts').doc(req.body.id).get();
        
        if (req.file != null && existingBlogPost != null) {
            const primaryImagePath = `blogPostImages/${existingBlogPost.id}.png`;
            await deleteImage(primaryImagePath);
            const newImageUrl = await uploadImage(req.file, primaryImagePath);
            existingBlogPost.ref.update({
                primaryImagePath: newImageUrl
            })
        }

        await existingBlogPost.ref.update({
            title: req.body.title,
            description: req.body.description,
        });
        
        res.status(200).send(`Blog Post Updated`);
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}


/** Get the blog post from its Id */
const getBlogPostById = async (req: express.Request, res: express.Response) => {

    try {
        const responseArray: Object[] = [];
        const blogpostId = req.params.blogpostId;
        console.log(blogpostId);
        const blogPostSnapshot = await db.collection("blogposts").doc(blogpostId).get();
        responseArray.push(await populateBlogPostData(blogPostSnapshot))
        //const blogpost = await populateBlogPostData(blogPostSnapshot.data() as BlogPostDatabaseStructure);
        //res.status(200).send(blogpost);
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
        content: blogpostDocumentData.text,   // TODO : change to advanced structure
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