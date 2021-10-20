import React, { useState, useEffect } from "react";
import PostView from "./PostView";
import useBlogPostApi from "../../../hooks/useBlogPostApi"
import { BlogPost } from "../../../models/blog-post";

// TODO: send img to firebase
// TODO map image(s) to BLogPost interface before sending (hook needs changes)
// ? hur kommer blogpostid till?

// TODO possibility to populate fields with existing blogpost (for editing mode)
// TODO: felhantering - "du måste ha en titel", etc

const PostPresenter = () => {

  const [handleGetAllBlogPosts, handleSetPost, handleGetBlogPostByUserId, handleGetBlogPostByPostId] = useBlogPostApi()

  const [blogPostContent, setblogPostContent] = useState("")
  const [blogPostImages, setblogPostImages] = useState<Array<File>>([])
  const [blogPostTitle, setblogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)


  const handleSubmit = async () => {
    // TODO user id should be included
    setIsLoading(true)
    await handleSetPost(blogPostTitle, blogPostContent)
    setIsLoading(false)
  }

  const handleTextChange = (e: any) => {
    const blogpostText = e.target.value;
    setblogPostContent(blogpostText)
  }

  const handleChangeHeader = (e: any) => {
    const blogpostTitle = e.target.value;
    setblogPostTitle(blogpostTitle)
  }

  const handleFileChange = (e: any) => {
    const files: Array<File> = Array.from(e.target.files)
    setblogPostImages(files)
  }

  return <PostView onHeadingChange={handleChangeHeader} onTextChange={handleTextChange} onImageChange={handleFileChange} onSubmit={handleSubmit} formValue={blogPostContent} formHeader={blogPostTitle} isLoading={loading} />;
};

export default PostPresenter;
