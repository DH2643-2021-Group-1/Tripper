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
  const [blogPostImage, setblogPostImage] = useState<Array<File | Blob>>([])
  const [blogPostTitle, setblogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)

  const [previewImage, setPreviewImage] = useState("")


  useEffect(() => {
    console.log("blogpostimage", blogPostImage)
  }, [blogPostImage])

  const handleSubmit = async () => {
    setIsLoading(true)
    await handleSetPost(blogPostTitle, blogPostContent)
    // when img upload is supported in backend:
    // await handleSetPost(blogPostTitle, blogPostContent, blogPostImage) 
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
    const file = e.target.files[0];
    setblogPostImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  return <PostView onHeadingChange={handleChangeHeader} onTextChange={handleTextChange} onImageChange={handleFileChange} onSubmit={handleSubmit} formValue={blogPostContent} formHeader={blogPostTitle} isLoading={loading} preview={previewImage} />;
};

export default PostPresenter;
