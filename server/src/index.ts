import express from 'express';
import path from 'path';

// rest of the code remains same
const app = express();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

app.get('/test', (req, res) => res.send('YES!!!'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client-build/')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/client-build/index.html'));
});