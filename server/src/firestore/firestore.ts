import express from 'express';
const firebase = require('../db')
const firestore = firebase.firestore()
import { DocumentData, DocumentReference } from '@firebase/firestore-types'

// TODO on POST look for auth in headers [ const { authorization } = req.headers ] 
// TODO all res.send should look somewhat the same, result in array [{}] etc

// ? get doc id by user id? Or is it same thing? do we have doc id in frontend? 
class SetBlogPost {
    title: string;
    text: string;
    userRef: DocumentReference<DocumentData>

    constructor(title: string, text: string, userRef: DocumentReference<DocumentData>) {
        this.title = title;
        this.text = text;
        this.userRef = userRef;
    }
}

class GetBlogPost { // Todo should be same classes?
    title: string;
    text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }
}

class ErrorMsg { // Todo should be same classes?
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

const setBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const obj = req.body
        let userReference: DocumentReference<DocumentData> = firestore.doc(`users/${obj.userRef}`)
        const blogPostData = new SetBlogPost(obj.title, obj.text, userReference);
        const doc = await firestore.collection('blogposts').add(JSON.parse(JSON.stringify(blogPostData)))
        console.log('Added document with ID: ', doc.id);
        res.status(200).send(`New blogpost with doc id ${doc.id} written to database`)
    }
    catch (error) {
        res.status(400).json({ error: 'an error occurred writing blogpost to database' })
    }
}


// TODO getBlogPostByUserId (i.e doc id of user)
const getBlogPostById = async (req: express.Request, res: express.Response) => {

    // TODO compare userRef with doc ref, make work
    // TODO take id from req params

    const userIdParam = req.params //parameter = id sent in the request
    let userPath = "/users/320v9d6BBIeCkorfQgjc"

    let userReference: DocumentReference<DocumentData> = firestore.doc(userPath)
    console.log("hejhej", userReference) // not the same if quering on all docs w userRef field

    try {
        let responseArray: Array<any> = []
        const blogpostsRef = await firestore.collection('blogposts');

        // this is not working...
        //const snapshot = await blogpostsRef.where('userRef', '==', userReference).get();

        // currently just getting all docs with userRef field
        const snapshot = await blogpostsRef.orderBy(`userRef`).get()

        if (snapshot.empty) {
            res.status(404).send('No such document exists');
        }
        snapshot.forEach((doc: DocumentData) => {
            // TODO get email and username as well
            console.log("userRef!", doc.data().userRef)
            const post = new GetBlogPost(doc.data().text, doc.data().title);
            responseArray.push(post)
        });
        res.status(200).send(responseArray)


    } catch (error) {
        console.log("error:(")
        res.status(400).json({ error: 'an error occurred getting blogpost' })
    }
}


const getAllBlogPosts = async (req: express.Request, res: express.Response) => {
    let responseArray: Array<any> = []
    try {
        const blogpostsRef = await firestore.collection('blogposts');
        const snapshot = await blogpostsRef.limit(10).get(); // ? orderBy(createdAt), ? set limit here or client?
        snapshot.forEach((doc: DocumentData) => {
            const post = new GetBlogPost(doc.data().text, doc.data().title);
            responseArray.push(post)
        });
        res.status(200).send(responseArray)
    } catch (error) {
        res.status(400).json({ error: 'an error occurred getting blogpost' })
    }

}

module.exports = {
    getBlogPostById,
    getAllBlogPosts,
    setBlogPost
}