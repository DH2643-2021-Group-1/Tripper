import React, { FC, useContext, useEffect, useState } from "react";
import PageLoadingIndicator from "../../page-loading-indicator/page-loading-indicator";
import { BlogPost } from "../../../models/blog-post";
import BlogPostPageView from "./BlogPostPageView";
import { useHistory, useParams } from "react-router-dom";
import {
  useDeleteBlogPostByPostId,
  useGetBlogPostByPostId,
} from "../../../hooks/useBlogPostApi";
import { calculateReadTimeInMinutes } from "../../../helpers/blog-post-read-time";
import { AuthContext } from "../../../contexts/AuthContext";

interface BlogPostPagePresenterParamTypes {
  id: string;
}

const BlogPostPagePresenter: FC = (props) => {
  const params = useParams<BlogPostPagePresenterParamTypes>();
  const blogPostId = params.id;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isFetchingBlogPost, setIsFetchingBlogPost] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

  const history = useHistory();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user == null || blogPost == null) {
      setIsOwner(false);
      return;
    }
    setIsOwner(user["uid"] == blogPost.author.id);
  }, [blogPost, user]);

  useEffect(() => {
    setIsFetchingBlogPost(true);
    useGetBlogPostByPostId(blogPostId).then((fetchedBlogPost: BlogPost[]) => {
      setBlogPost(fetchedBlogPost[0]);
      setIsFetchingBlogPost(false);
    });
  }, [blogPostId]);

  const handleDelete = async () => {
    setDeleteIsLoading(true);
    await useDeleteBlogPostByPostId(blogPostId);
    setDeleteIsLoading(false);
    history.replace(`/`);
  };

  const handleEdit = () => {
    history.push(`/edit-post/${blogPostId}`);
  };

  const render = () => {
    if (isFetchingBlogPost) {
      return <PageLoadingIndicator />;
    }
    if (blogPost != null) {
      return (
        <BlogPostPageView
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleteLoading={deleteIsLoading}
          isOwner={isOwner}
          readingSpeed={calculateReadTimeInMinutes(blogPost.content)}
          blogPost={blogPost}
        />
      );
    }
    return <div>Blog post do not exist</div>;
  };

  return render();
};

export default BlogPostPagePresenter;
