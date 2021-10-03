import express from 'express';
const firebase = require('../db')
const firestore = firebase.firestore()

class BlogPost {
    title: string;
    text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }
}

const setBlogPost = async (req: express.Request, res: express.Response) => {
    // TODO: should hold reference to user
    try {
        // TODO make not hardcoded - > const obj = JSON.parse(req.body) // title: obj.title, text: object.text
        const blogPostData = {
            title: "Blog post title",
            text: "The text in the blogpost"
            //userRef: "how is this set?"
        }
        const doc = await firestore.collection('blogposts').add(blogPostData)
        console.log('Added document with ID: ', doc.id);
        res.send("New blogpost written to database")
    }
    catch (error) {
        res.status(400).json({ error: 'an error occurred writing blogpost to database' })
    }
}

const getBlogPost = async (req: express.Request, res: express.Response) => {
    // TODO: make not hardcoded, (and fix firestore layout)
    try {
        const blopostArray = []
        const doc = await firestore
            .collection('users')
            .doc('E5Tfio3g1jlQvuzOnlE6')
            .collection('blogposts')
            .doc('v9qD8b344kCe3bCXTkA5').get()
        if (!doc.exists) {
            res.status(404).send('No such document exists');
        }
        const post = new BlogPost(doc.data().text, doc.data().title);
        blopostArray.push(post)
        //res.status(200).send(blopostArray)
        res.send(blopostArray)
    } catch (error) {
        console.log("error:(")
        res.status(400).json({ error: 'an error occurred getting blogpost' })
    }
}

const testFunc = (req: express.Request, res: express.Response) => {
    res.send("hello:)")
}

module.exports = {
    getBlogPost,
    setBlogPost,
    testFunc
}