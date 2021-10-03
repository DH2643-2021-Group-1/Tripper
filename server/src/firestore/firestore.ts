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

const getBlogPost = async (req: express.Request, res: express.Response) => {
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
        res.status(400).json({ error: 'an error occurred' })
    }
}

const testFunc = (req: express.Request, res: express.Response) => {
    res.send("hello:)")
}

module.exports = {
    getBlogPost,
    testFunc
}