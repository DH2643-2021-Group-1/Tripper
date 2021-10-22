import React, { useState, useEffect } from "react";
import PostView from "./PostView";
import useBlogPostApi, { useCreateBlogPost } from "../../../hooks/useBlogPostApi"
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";

// TODO possibility to populate fields with existing blogpost (for editing mode)
// TODO: felhantering - "du måste ha en titel", etc

const PostPresenter = () => {

  const [handleGetAllBlogPosts, handleGetBlogPostByUserId, handleGetBlogPostByPostId] = useBlogPostApi()

  const [blogPostDescription, setBlogPostDescription] = useState("")
  const [blogPostImage, setBlogPostImage] = useState<File | null>(null)
  const [blogPostTitle, setBlogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [blogPostContent, setBlogPostContent] = useState<BlogPostContent>({
     contentPieces: [],
  })

  const [previewImage, setPreviewImage] = useState("")

  const handleSubmit = async () => {
    if (blogPostImage == null) return;
    setIsLoading(true)
    console.log(blogPostTitle);
    await useCreateBlogPost(blogPostTitle, blogPostDescription, blogPostImage);
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

