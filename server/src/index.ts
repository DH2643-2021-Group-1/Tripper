import express from 'express';
const { getBlogPost, setBlogPost } = require("./firestore/firestore")
// rest of the code remains same

const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


app.get('/test', (req, res) => res.send('YES!!!'));


app.get('/blogposts', (req, res) => {
  getBlogPost(req, res)
})

app.post('/blogposts', (req, res) => {
  setBlogPost(req, res)
})


