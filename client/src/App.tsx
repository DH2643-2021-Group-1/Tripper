import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import axios from "axios";
import Button, { ButtonTypes } from "./components/button/button";
import Menu from "./components/MenuPresenter/MenuPresenter";
import WelcomePresenter from "./components/pages/WelcomePage/WelcomePresenter";
import ProfilePresenter from "./components/pages/ProfilePage/ProfilePresenter";
import PostPresenter from "./components/pages/PostPage/PostPresenter";
import EditPresenter from "./components/pages/EditPage/EditPresenter";
import BlogPostCard from "./components/blog-post-card/blog-post-card";
import { BlogPost } from "./models/blog-post";
import BlogPostPagePresenter from "./components/pages/BlogPostPage/BlogPostPagePresenter";

const App: React.FC = () => {
  useEffect(() => {
    // TODO: This is just an example how to call the backend server. Should be deleted
    const callBackend = async () => {
      var serverMessage = await axios.get("test");
      console.log(serverMessage);
    };
    callBackend();
  }, []);

  const dummyBlogPost: BlogPost = {
    id: "43ds9f39h9shs",
    title: "This is a title",
    primaryImage:
      "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
    description:
      "This is a description that is somewhat to long to be contained in the blog post card.",
    content: "TODO",
    publicationDate: new Date(),
    author: {
      email: "adajon@kth.se",
      firstName: "Adam",
      lastName: "Jonsson",
      profilePicture: null,
    },
  };

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/home"]}>
          <Menu />
          <div className="pageContainer">
            <WelcomePresenter />
          </div>
        </Route>
        <Route path="/blog/:id">
          <Menu />
          <BlogPostPagePresenter />
        </Route>
        <Route exact path="/post">
          <Menu />
          <div className="pageContainer">
            <PostPresenter />
          </div>
        </Route>
        <Route exact path="/profile">
          <Menu />
          <div className="pageContainer">
            <ProfilePresenter />
          </div>
        </Route>
        <Route exact path="/edit">
          <Menu />
          <div className="pageContainer">
            <EditPresenter />
          </div>
        </Route>
        <Route exact path="/components">
          <Menu />
          <div className="pageConatiner">
            <header className="App-header">
              <h1>Tripper</h1>
              <p>
                This is just for testing the basic components. Can be deleted :)
              </p>

              <Button
                disabled={false}
                type={ButtonTypes.primary}
                onPress={() => {
                  alert("Button Pressed");
                }}
              >
                A primary button
              </Button>

              <br />

              <Button
                disabled={false}
                type={ButtonTypes.secondary}
                onPress={() => {
                  alert("Button Pressed");
                }}
              >
                A secondary button
              </Button>

              <br />

              <BlogPostCard data={dummyBlogPost} />
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
