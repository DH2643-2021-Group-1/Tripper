import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Menu from "./components/MenuPresenter/MenuPresenter";
import WelcomePresenter from "./components/pages/WelcomePage/WelcomePresenter";
import ProfilePresenter from "./components/pages/ProfilePage/ProfilePresenter";
import PostPresenter from "./components/pages/PostPage/PostPresenter";
import EditPresenter from "./components/pages/EditPage/EditPresenter";
import BlogPostPagePresenter from "./components/pages/BlogPostPage/BlogPostPagePresenter";

const App: React.FC = () => {
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
        <Route exact path="/edit-post/:id">
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
      </Switch>
    </Router>
  );
};

export default App;
