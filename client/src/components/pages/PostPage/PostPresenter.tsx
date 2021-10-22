import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostView from "./PostView";
import useBlogPostApi from "../../../hooks/useBlogPostApi"
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";
import { useParams } from 'react-router-dom';
import { BlogPost } from "../../../models/blog-post";


// TODO possibility to populate fields with existing blogpost (for editing mode)
// TODO: felhantering - "du måste ha en titel", etc
interface PostPagePresenterParamTypes {
  id: string
}

const PostPresenter = () => {
  const [handleGetAllBlogPosts, handleSetPost, handleGetBlogPostByUserId, handleGetBlogPostByPostId] = useBlogPostApi()

  let location = useLocation()
  const params = useParams<PostPagePresenterParamTypes>();
  const blogPostId = params.id;

  const [blogPostDescription, setBlogPostDescription] = useState("")
  const [blogPostImage, setblogPostImage] = useState<Array<File | Blob>>([])
  const [blogPostTitle, setblogPostTitle] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [blogPostContent, setBlogPostContent] = useState<BlogPostContent>({
    contentPieces: [],
  })

  const [previewImage, setPreviewImage] = useState("")

  // here's an id that exists http://localhost:8080/edit-post/5nuHLdsKtU96PsR5IRDF
  useEffect(() => {
    if (blogPostId && location.pathname == `/edit-post/${blogPostId}`) {
      handleGetBlogPostByPostId(blogPostId).then((response: BlogPost[]) => {
        setblogPostTitle(response[0].title)
        setblogPostContent(response[0].content)
        setPreviewImage(response[0].primaryImage)
      })
    }
  }, []);

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
    content={blogPostContent} />;
};

export default PostPresenter;
