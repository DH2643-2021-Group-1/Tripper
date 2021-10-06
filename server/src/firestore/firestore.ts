import express from 'express';
const firebase = require('../db')
const firestore = firebase.firestore()
import { DocumentData, DocumentReference } from '@firebase/firestore-types'

// TODO on POST look for auth in headers [ const { authorization } = req.headers ] 
// TODO all res.send should look somewhat the same, result in array [{}] etc


// Get blogpost by user // getBlogpostByUserId
// Get all blogposts // limit 10 default, otherwise specify?
// Get blogpost by blogpost id = doc id // getBlogpostByDocId
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

// ! param userRef
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

// ! param id, getBlogPostByUserId
// return the userinfo, "posted by Anna G, anna@gmail.com"
const getBlogPost = async (req: express.Request, res: express.Response) => {
    // TODO: make not hardcoded, (and fix firestore layout)
    try {
        console.log("called getBlogPost")
        const blopostArray = []
        const doc = await firestore
            .collection('users')
            .doc('E5Tfio3g1jlQvuzOnlE6')
            .collection('blogposts')
            .doc('v9qD8b344kCe3bCXTkA5').get()
        if (!doc.exists) {
            res.status(404).send('No such document exists');
        }
        const post = new GetBlogPost(doc.data().text, doc.data().title);
        blopostArray.push(post)
        console.log("result", blopostArray)
        res.status(200).send(blopostArray)
    } catch (error) {
        console.log("error:(")
        res.status(400).json({ error: 'an error occurred getting blogpost' })
    }
}

module.exports = {
    getBlogPost,
    setBlogPost
}