import React, { useEffect } from 'react';
import './App.scss';
import axios from "axios";
import Button, { ButtonTypes } from './components/button/button';
import BlogPostCard from './components/blog-post-card/blog-post-card';
import { BlogPost } from './models/blog-post';

function App() {

  useEffect(() =>{
    // TODO: This is just an example how to call the backend server. Should be deleted
    const callBackend = async () => {
      var serverMessage = await axios.get("test");
      console.log(serverMessage);
    }
    callBackend();
  }, [])

  const dummyBlogPost: BlogPost = {
    id: "43ds9f39h9shs",
    title: "This is a title",
    primaryImage: "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
    description: "This is a description that is somewhat to long to be contained in the blog post card.",
    content: "TODO",
    publicationDate: new Date(),
    author: {
      email: "adajon@kth.se",
      firstName: "Adam",
      lastName: "Jonsson",
      profilePicture: null,
    }
  } 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tripper</h1>
        <p>This is just for testing the basic components. Can be deleted :)</p>

        <Button
          disabled={false}
          type={ButtonTypes.primary}
          onPress={() => {
            alert("Button Pressed");
          }}>
          A primary button
        </Button>

        <br/>

        <Button 
          disabled={false}
          type={ButtonTypes.secondary}
          onPress={() => {
            alert("Button Pressed");
          }}>
          A secondary button
        </Button>

        <br/>

        <BlogPostCard data={ dummyBlogPost }>
        </BlogPostCard>
      </header>
    </div>
  );
}

export default App;
