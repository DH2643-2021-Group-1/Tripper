import React, { useEffect, useState } from "react";
import WelcomeView from "./WelcomeView";
import useBlogPostApi from "../../../hooks/useBlogPostApi";

interface Props {}

const WelcomePresenter: React.FC<Props> = () => {
  const [handleGetAllBlogPosts] = useBlogPostApi();
  const [blogPosts, setBlogPosts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    handleGetAllBlogPosts().then((posts) => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  return <WelcomeView isLoading={loading} blogPosts={blogPosts} />;
};

export default WelcomePresenter;
