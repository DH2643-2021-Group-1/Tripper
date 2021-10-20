import * as express from 'express';
import { db, storage } from '../db';

interface BlogPostDatabaseStructure {
    title: string,
    text: string,
    userRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
}


const createBlogPost = async (req: express.Request, res: express.Response) => {
    // TODO include img
    try {
        const doc = await db.collection('blogposts').add({
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId,
            userRef: db.doc(`users/${req.body.userId}`)
        });

        console.log('Added document with ID: ', doc.id);
        res.status(200).send(`New blogpost with doc id ${doc.id} written to database`)
    }
    catch (error) {
        console.log("error:(", error)
        res.status(400).json({ error: error })
    }
}


/** Get the blog post from its Id */
const getBlogPostById = async (req: express.Request, res: express.Response) => {
    const blogpostId = req.params.blogpostId;
    console.log(blogpostId);
    const blogPostSnapshot = await db.collection("blogposts").doc(blogpostId).get();
    const blogpost = await populateBlogPostData(blogPostSnapshot.data() as BlogPostDatabaseStructure);
    res.status(200).send(blogpost);
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
        responseArray.push(await populateBlogPostData(doc.data() as BlogPostDatabaseStructure));
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
            responseArray.push(await populateBlogPostData(doc.data() as BlogPostDatabaseStructure));
        }
        res.status(200).send(responseArray);
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

/** Internal function that populates blog post data with the authors data */
const populateBlogPostData = async (blogpostDocumentData: BlogPostDatabaseStructure): Promise<any> => {
    const authorRef = blogpostDocumentData.userRef;
    const author = await authorRef.get();
    return {
        title: blogpostDocumentData.title,
        text: blogpostDocumentData.text,
        author: {
            firstName: author.data()?.firstName
        }
    };
}

export {
    getBlogPostsFromUserId,
    getBlogPostById,
    getAllBlogPosts,
    createBlogPost as setBlogPost
}