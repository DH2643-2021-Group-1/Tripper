import React, { useEffect } from "react";
import WelcomeView from "./WelcomeView";
import useBlogPostApi from "../../../hooks/useBlogPostApi";

interface Props {}

const WelcomePresenter: React.FC<Props> = () => {
  const [
    handleGetAllBlogPosts,
    handleSetPost,
    handleGetBlogPostByUserId,
    handleGetBlogPostByPostId,
  ] = useBlogPostApi();
  const [blogPosts, setBlogPosts] = React.useState<Array<any>>([]);

  useEffect(() => {
    handleGetAllBlogPosts().then((posts) => {
      console.log("blogposts: ", posts);
      setBlogPosts(posts);
    });
  }, []);

  return <WelcomeView blogPosts={blogPosts} />;
};

export default WelcomePresenter;
