import express from 'express';
const { getBlogPost, setBlogPost, testFunc } = require("./firestore/firestore")
// rest of the code remains same
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

// TODO datan ska kunna skickas i headers : getblogPost(blogpostsID), setBlogPost({"blogpostitle", "blogpostext"})

app.get('/test', (req, res) => res.send('YES!!!'));


app.get('/blogposts', (req, res) => {
  getBlogPost(req, res)
})

// app.post('/blogposts', (req, res) => {
//   setBlogPost(req, res)
// })

app.get('/blogg', (req, res) => {
  setBlogPost(req, res)
})

app.get("/skoj", (req, res) => {
  testFunc(req, res)
})
