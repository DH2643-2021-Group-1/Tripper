import React from "react";
import "./WelcomePage.scss";
import BlogPostCard from "../../blog-post-card/blog-post-card";

interface Props {
  blogPosts: Array<any>;
}

const WelcomeView: React.FC<Props> = ({ blogPosts }) => {
  return (
    <div className="welcome-page__container">
      {blogPosts.map((post, idx) => {
        return (
          <div className="welcome-page-post-container" key={idx}>
            <BlogPostCard data={post} key={idx} />
          </div>
        );
      })}
    </div>
  );
};

export default WelcomeView;
