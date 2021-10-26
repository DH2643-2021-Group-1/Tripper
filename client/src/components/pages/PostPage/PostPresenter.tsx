import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PostView from "./PostView";
import useBlogPostApi, {
  useCreateBlogPost,
  useGetBlogPostByPostId,
  useUpdateBlogPost,
} from "../../../hooks/useBlogPostApi";
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";
import { useParams } from "react-router-dom";
import { BlogPost } from "../../../models/blog-post";
import { EditType } from "../../../models/blog-post-content/blog-post-content-piece";
import { AuthContext } from "../../../contexts/AuthContext";

interface PostPagePresenterParamTypes {
  id: string;
}

const PostPresenter = () => {
  const [handleGetAllBlogPosts, handleGetBlogPostByUserId] = useBlogPostApi();

  let location = useLocation();
  const params = useParams<PostPagePresenterParamTypes>();
  const blogPostId = params.id;

  const [editMode, setEditMode] = useState<boolean>(false);

  const [blogPostDescription, setBlogPostDescription] = useState("");
  const [blogPostImage, setBlogPostImage] = useState<File | null>(null);
  const [blogPostTitle, setBlogPostTitle] = useState("");
  const [newBlogPostId, setNewBlogPostId] = useState<null>(null);
  const [blogPostUploadStatus, setBlogPostUploadStatus] = useState<{
    success: boolean;
    error: string | null;
  } | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [blogPostContent, setBlogPostContent] = useState<BlogPostContent>({
    contentPieces: [],
  });
  const [previewImage, setPreviewImage] = useState("");
  const history = useHistory();

  const [titleExists, setTitleExists] = useState(false);
  const [descriptionExists, setDescriptionExists] = useState(false);
  const [imageExists, setImageExists] = useState(false);

  const [requireTitle, setRequireTitle] = useState(false);
  const [requireDescription, setRequireDescription] = useState(false);
  const [requireImage, setRequireImage] = useState(false);
  const [requireContentPieces, setRequireContentPieces] = useState(false);

  const [opacity, setOpacity] = useState<number>(0);
  const user = useContext(AuthContext);

  useEffect(() => {
    setTitleExists(blogPostTitle.length > 0);
    setRequireTitle(false);
  }, [blogPostTitle]);

  useEffect(() => {
    setDescriptionExists(blogPostDescription.length > 0);
    setRequireDescription(false);
  }, [blogPostDescription]);

  useEffect(() => {
    setImageExists(previewImage != "");
    setRequireImage(false);
  }, [blogPostImage]);

  useEffect(() => {
    setRequireContentPieces(false);
  }, [blogPostContent]);

  // here's an id that exists http://localhost:8080/edit-post/5nuHLdsKtU96PsR5IRDF
  useEffect(() => {
    if (blogPostId && location.pathname == `/edit-post/${blogPostId}`) {
      setEditMode(true);
      useGetBlogPostByPostId(blogPostId).then((response: BlogPost[]) => {
        const existingBlogPost = response[0];
        setBlogPostTitle(existingBlogPost.title);
        setBlogPostDescription(existingBlogPost.description);
        setBlogPostContent(existingBlogPost.content);
        setPreviewImage(existingBlogPost.primaryImage);
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (user == null) return;
    setIsLoading(true);
    setBlogPostUploadStatus(null);

    try {
      var result: any;
      if (editMode) {
        result = await useUpdateBlogPost(
          blogPostId,
          blogPostTitle,
          blogPostDescription,
          blogPostImage,
          blogPostContent,
          user["uid"]
        );
      } else {
        if (blogPostImage == null) return;
        result = await useCreateBlogPost(
          blogPostTitle,
          blogPostDescription,
          blogPostImage,
          blogPostContent,
          user["uid"]
        );
      }
      setBlogPostUploadStatus({ success: true, error: null });
      setNewBlogPostId(result.data?.blogPostId ?? null);
    } catch (error: any) {
      if (error?.message == "Network Error") {
        setBlogPostUploadStatus({
          success: false,
          error: "You seem to be offline. Check you networks settings",
        });
      } else {
        setBlogPostUploadStatus({ success: false, error: error?.message });
      }
    }

    setIsLoading(false);
  };

  const handleEmptyFieldsError = () => {
    /* checks which of the required fields are not yet filled in */
    setRequireTitle(!titleExists);
    setRequireDescription(!descriptionExists);
    setRequireImage(!imageExists);

    if (blogPostContent.contentPieces.length > 0) {
      setRequireContentPieces(false);
    } else {
      setRequireContentPieces(true);
    }
  };

  const handleDescriptionChange = (e: any) => {
    e.preventDefault();
    const blogpostText = e.target.value;
    setBlogPostDescription(blogpostText);
  };

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    const blogpostTitle = e.target.value;
    setBlogPostTitle(blogpostTitle);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setBlogPostImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleContentChange = (updatedContent: BlogPostContent) => {
    console.log(updatedContent);
    setBlogPostContent(updatedContent);
  };

  const handleNavigateToBlogPage = () => {
    history.replace(`/blog/${newBlogPostId ?? blogPostId}`);
  };

  const onImageRemove = () => {
    setPreviewImage("");
  };

  const onImageHover = () => {
    if (opacity === 0) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  };

  const numberOfNonDeleteContentPieces = () => {
    var amount = 0;
    blogPostContent.contentPieces.forEach((piece) => {
      if (piece.editType != EditType.delete) {
        amount++;
      }
    });
    return amount;
  };

  const requiredFieldsOnPostOK = () => {
    return (
      titleExists &&
      descriptionExists &&
      imageExists &&
      numberOfNonDeleteContentPieces() > 0
    );
  };
  const requiredFieldsOnEdit = () => {
    return (
      editMode &&
      titleExists &&
      descriptionExists &&
      numberOfNonDeleteContentPieces() > 0
    );
  };

  const readyForSubmit = () => {
    if (editMode) return requiredFieldsOnEdit();
    else return requiredFieldsOnPostOK();
  };

  return (
    <PostView
      editMode={editMode}
      onContentChange={handleContentChange}
      onDescriptionChange={handleDescriptionChange}
      onTitleChange={handleTitleChange}
      onImageChange={handleFileChange}
      onSubmit={readyForSubmit() ? handleSubmit : handleEmptyFieldsError}
      description={blogPostDescription}
      title={blogPostTitle}
      isLoading={loading}
      imageUrl={previewImage}
      content={blogPostContent}
      requireTitle={requireTitle}
      requireDescription={requireDescription}
      requireImage={requireImage}
      requireContentPieces={requireContentPieces}
      imageOpacity={opacity}
      onImageHover={onImageHover}
      onImageRemove={onImageRemove}
      allFieldsOK={readyForSubmit()}
      uploadStatus={blogPostUploadStatus}
      onNavigateToBlogPage={handleNavigateToBlogPage}
    />
  );
};

export default PostPresenter;
