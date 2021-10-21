import React, { useState, useEffect } from "react";
import PostView from "./PostView";
import useBlogPostApi from "../../../hooks/useBlogPostApi"
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";

// TODO possibility to populate fields with existing blogpost (for editing mode)
// TODO: felhantering - "du måste ha en titel", etc

const PostPresenter = () => {

  const [handleGetAllBlogPosts, handleSetPost, handleGetBlogPostByUserId, handleGetBlogPostByPostId] = useBlogPostApi()

  const [blogPostDescription, setBlogPostDescription] = useState("")
  const [blogPostImage, setblogPostImage] = useState<Array<File | Blob>>([])
  const [blogPostTitle, setblogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [blogPostContent, setBlogPostContent] = useState<BlogPostContent>({
     contentPieces: [],
  })

  const [previewImage, setPreviewImage] = useState("")


  const handleSubmit = async () => {
    setIsLoading(true)
    await handleSetPost(blogPostTitle, blogPostDescription)
    // when img upload is supported in backend:
    // await handleSetPost(blogPostTitle, blogPostContent, blogPostImage) 
    setIsLoading(false)
  }

  const handleTextChange = (e: any) => {
    e.preventDefault();
    const blogpostText = e.target.value;
    setBlogPostDescription(blogpostText)
  }

  const handleChangeHeader = (e: any) => {
    e.preventDefault();
    const blogpostTitle = e.target.value;
    setblogPostTitle(blogpostTitle)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setblogPostImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleContentChange = (updatedContent: BlogPostContent) => {
    setBlogPostContent(updatedContent);
  }

  return <PostView 
    onContentChange={handleContentChange}
    onHeadingChange={handleChangeHeader}
    onTextChange={handleTextChange} 
    onImageChange={handleFileChange} 
    onSubmit={handleSubmit} 
    formValue={blogPostDescription} 
    formHeader={blogPostTitle} 
    isLoading={loading} 
    preview={previewImage} 
    content={blogPostContent}/>;
};

export default PostPresenter;
