import React from "react";
import "./WelcomePage.scss";
import BlogPostCard from "../../blog-post-card/blog-post-card";
import ContentWrapper from "../../content-wrapper/content-wrapper";
import PageLoadingIndicator from "../../page-loading-indicator/page-loading-indicator";

interface Props {
  blogPosts: Array<any>;
  isLoading: boolean;
}

const WelcomeView: React.FC<Props> = (props) => {
  if (props.isLoading) return <PageLoadingIndicator />;

  return (
    <ContentWrapper>
      <div className="welcome-page__container">
        {props.blogPosts.map((post, idx) => {
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
