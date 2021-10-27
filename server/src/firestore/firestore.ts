import * as express from 'express';

import { auth, firestore } from 'firebase-admin';
import { db, storage } from '../db';
import { deleteImage, uploadImage } from './image-manager';


interface BlogPostDatabaseStructure {
    id: string,
    title: string,
    content: object,
    primaryImage: string,
    description: string,
    publicationDate: Date,
    userRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
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
        const snapshot = await blogpostCollection.orderBy("publicationDate", "desc").limit(10).get(); // ? orderBy(createdAt), ? set limit here or client?
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
            id: author.id,
            displayName: author.data()?.displayName,
            profilePicture: author.data()?.profilePicture,
            email: author.data()?.email
        }
    };
}

const editProfilePage = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.body.userId;
        const displayName = req.body.displayName;
        const biography = req.body.biography;
        let newImageUrl;

        const files = req.files! as { [fieldname: string]: Express.Multer.File[] };
        if (files['profileImage']){
            const profileImage = files['profileImage'];

            const profileImagePath = `profileImages/${userId}.png`;
            newImageUrl = await uploadImage(profileImage[0], profileImagePath);
        }
        else if(req.body.changedImage === 'false'){
            const user = await db.collection('users').doc(userId).get();
            newImageUrl = user.data()?.profilePicture;
        }
        else {
            newImageUrl = null;
        }
        
        const profileSnapshot = await db.collection('users').doc(userId).update({
            displayName: displayName,
            biography: biography,
            profilePicture: newImageUrl
        })
        res.status(200).send(displayName);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

const getUserDetails = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const profileSnapshot = await db.collection('users').doc(userId).get();
        const userData = profileSnapshot?.data();
        res.status(200).send(userData);
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const createUser = async (req: express.Request, res: express.Response) => {

    try {
        const { displayName, email, photoURL, uid } = req.body;
        const doc = await db.collection("users").doc(uid).set({
            biography: '',
            displayName, 
            email, 
            profilePicture: photoURL,
        })
        res.status(200).send(`New user written to database`)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const checkUser = async (req: express.Request, res: express.Response) => {
    const responseArray: Object[] = [];
    try {
        const userId = req.params.userId;
        const profileSnapshot = await db.collection('users').doc(userId).get()
        if (profileSnapshot.exists) {
            res.status(200).send(true); // TODO: is this good practice?
        } else {
            res.status(200).send(false);
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

export {
    getBlogPostsFromUserId,
    getBlogPostById,
    getAllBlogPosts,
    editProfilePage,
    getUserDetails,
    createUser,
    checkUser
}