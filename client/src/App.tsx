import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Menu from "./components/MenuPresenter/MenuPresenter";
import WelcomePresenter from "./components/pages/WelcomePage/WelcomePresenter";
import ProfilePresenter from "./components/pages/ProfilePage/ProfilePresenter";
import PrivateRoute from "./configs/PrivateRoute";
import PostPresenter from "./components/pages/PostPage/PostPresenter";
import EditPresenter from "./components/pages/EditPage/EditPresenter";
import BlogPostPagePresenter from "./components/pages/BlogPostPage/BlogPostPagePresenter";

import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
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
          <PrivateRoute exact path="/post">
            <Menu />
            <div className="pageContainer">
              <PostPresenter />
            </div>
          </PrivateRoute>
          <PrivateRoute exact path="/edit-post/:id">
            <Menu />
            <div className="pageContainer">
              <PostPresenter />
            </div>
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <Menu />
            <div className="pageContainer">
              <ProfilePresenter />
            </div>
          </PrivateRoute>
          <PrivateRoute exact path="/edit">
            <Menu />
            <div className="pageContainer">
              <EditPresenter />
            </div>
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
