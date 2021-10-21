import React from "react";
import "./WelcomePage.scss";
import BlogPostCard from "../../blog-post-card/blog-post-card";

interface Props {
  blogPosts: Array<any>;
}

const WelcomeView: React.FC<Props> = ({ blogPosts }) => {
  return (
    <div className="welcomePageContainer">
      {blogPosts.map((post, idx) => {
        return <BlogPostCard data={post} key={idx} />;
      })}
    </div>
  );
};

export default WelcomeView;
