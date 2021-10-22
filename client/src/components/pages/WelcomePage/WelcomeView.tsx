import React from "react";
import "./WelcomePage.scss";
import BlogPostCard from "../../blog-post-card/blog-post-card";
import ContentWrapper from "../../content-wrapper/content-wrapper";

interface Props {
  blogPosts: Array<any>;
}

const WelcomeView: React.FC<Props> = ({ blogPosts }) => {
  return (
    <ContentWrapper>
      <div className="welcome-page__container">
        {blogPosts.map((post, idx) => {
          return (
            <div className="welcome-page-post-container" key={idx}>
              <BlogPostCard data={post} key={idx} />
            </div>
          );
        })}
      </div>
    </ContentWrapper>
  );
};

export default WelcomeView;
