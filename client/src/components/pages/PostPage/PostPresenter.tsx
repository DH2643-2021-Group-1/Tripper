import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostView from "./PostView";
import useBlogPostApi, { useCreateBlogPost, useGetBlogPostByPostId, useUpdateBlogPost } from "../../../hooks/useBlogPostApi"
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";
import { useParams } from 'react-router-dom';
import { BlogPost } from "../../../models/blog-post";


// TODO possibility to populate fields with existing blogpost (for editing mode)
// TODO: felhantering - "du måste ha en titel", etc
interface PostPagePresenterParamTypes {
  id: string
}

const PostPresenter = () => {

  const [handleGetAllBlogPosts, handleGetBlogPostByUserId] = useBlogPostApi()

  let location = useLocation()
  const params = useParams<PostPagePresenterParamTypes>();
  const blogPostId = params.id;

  const [editMode, setEditMode] = useState<boolean>(false);

  const [blogPostDescription, setBlogPostDescription] = useState("")
  const [blogPostImage, setBlogPostImage] = useState<File | null>(null)
  const [blogPostTitle, setBlogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [blogPostContent, setBlogPostContent] = useState<BlogPostContent>({
    contentPieces: [],
  })

  const [previewImage, setPreviewImage] = useState("")

  // here's an id that exists http://localhost:8080/edit-post/5nuHLdsKtU96PsR5IRDF
  useEffect(() => {
    if (blogPostId && location.pathname == `/edit-post/${blogPostId}`) {
      console.log(blogPostId);
      setEditMode(true);
      useGetBlogPostByPostId(blogPostId).then((response: BlogPost[]) => {
        const existingBlogPost = response[0];
        setBlogPostTitle(existingBlogPost.title);
        setBlogPostDescription(existingBlogPost.description);
        setBlogPostContent(existingBlogPost.content);
        setPreviewImage(existingBlogPost.primaryImage);
      })
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true)

    if (editMode) {
      await useUpdateBlogPost(blogPostId, blogPostTitle, blogPostDescription, blogPostImage, blogPostContent);
    }
    else {
      if (blogPostImage == null) return;
      await useCreateBlogPost(blogPostTitle, blogPostDescription, blogPostImage, blogPostContent);
    }

    setIsLoading(false)
  }

  const handleDescriptionChange = (e: any) => {
    e.preventDefault();
    const blogpostText = e.target.value;
    setBlogPostDescription(blogpostText)
  }

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    const blogpostTitle = e.target.value;
    setBlogPostTitle(blogpostTitle)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setBlogPostImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleContentChange = (updatedContent: BlogPostContent) => {
    setBlogPostContent(updatedContent);
  }

  return <PostView
    onContentChange={handleContentChange}
    onDescriptionChange={handleDescriptionChange}
    onTitleChange={handleTitleChange} 
    onImageChange={handleFileChange} 
    onSubmit={handleSubmit} 
    description={blogPostDescription} 
    title={blogPostTitle} 
    isLoading={loading} 
    imageUrl={previewImage} 
    content={blogPostContent}/>;
};

export default PostPresenter;

