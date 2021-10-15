import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { getBlogPostsFromUserId, getAllBlogPosts, getBlogPostById, setBlogPost as createBlogPost } from "./firestore/firestore";
// rest of the code remains same

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

app.get('/test', (req, res) => res.send('YES!!!'));

app.get('/blogpost/:blogpostId', (req, res) => {
  getBlogPostById(req, res);
})

app.get('/blogpost-from-author/:userId', (req, res) => {
  getBlogPostsFromUserId(req, res);
})

app.post('/create-blogpost', (req, res) => {
  createBlogPost(req, res)
})

app.get('/all-blogposts', (req, res) => {
  getAllBlogPosts(req, res)
})

/** This is the client hosting */
app.use(express.static(path.join(__dirname, 'client-build/')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/client-build/index.html'));
});

