import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as multer from "multer";
import {
  getBlogPostsFromUserId,
  getAllBlogPosts,
  getBlogPostById,
  editProfilePage,
  getUserDetails,
} from "./firestore/firestore";

import {
  createBlogPost,
  updateBlogPost,
} from "./firestore/edit-blog-post-manager";
// rest of the code remains same

const app = express();
let upload = multer();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

app.get("/test", (req, res) => res.send("YES!!!"));

app.get("/blogpost/:blogpostId", (req, res) => {
  getBlogPostById(req, res);
});

app.get("/blogpost-from-author/:userId", (req, res) => {
  getBlogPostsFromUserId(req, res);
});


app.post(
    "/create-blogpost", 
    upload.fields([
      { name: 'primaryImage', maxCount: 1 }, 
      { name: 'imagePieces', maxCount: 20 }
    ]), 
    (req, res) => {
  createBlogPost(req, res);
});

app.put(
  "/update-blogpost", 
  upload.fields([
    { name: 'primaryImage', maxCount: 1 }, 
    { name: 'imagePieces', maxCount: 20 }
  ]), (req, res) => {
  updateBlogPost(req, res);
});

app.get("/all-blogposts", (req, res) => {
  getAllBlogPosts(req, res);
});

app.post(
  "/edit-profile",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  (req, res) => {
    editProfilePage(req, res);
  }
);

app.get("/user/:userId", (req, res) => {
  getUserDetails(req, res);
});

/** This is the client hosting */
app.use(express.static(path.join(__dirname, "client-build/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client-build/index.html"));
});
