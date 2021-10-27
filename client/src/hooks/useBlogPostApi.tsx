import axios from "axios";
import {
  getBlogPostByUserId,
  getAllBlogPosts,
  getUserDetails,
  createUser,
  checkUser,
} from "../blogpostApi";
import { BlogPost } from "../models/blog-post";
import { BlogPostContent } from "../models/blog-post-content/blog-post-content";
import { BlogPostContentImage } from "../models/blog-post-content/blog-post-content-image";

let result: Array<BlogPost>;

export const useCreateBlogPost = async (
  title: string,
  description: string,
  primaryImage: File,
  content: BlogPostContent,
  userId: string,
) => {
  var formData = createFormDataBaseForBlogPostChanges(
    title,
    description,
    userId,
  );
  formData.append("primaryImage", primaryImage, "primaryImage.png");
  const contentPreparedForUpload = prepareContentForUpload(formData, content);
  formData.append("content", JSON.stringify(contentPreparedForUpload));
  const res = await axios.post("/api/create-blogpost", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const useUpdateBlogPost = async (
  id: string,
  title: string,
  description: string,
  primaryImage: File | null,
  content: BlogPostContent,
  userId: string,
) => {
  var formData = createFormDataBaseForBlogPostChanges(
    title,
    description,
    userId,
  );
  const contentPreparedForUpload = prepareContentForUpload(formData, content);
  formData.append("id", id);
  formData.append("content", JSON.stringify(contentPreparedForUpload));

  if (primaryImage != null) {
    formData.append("primaryImage", primaryImage, "primaryImage.png");
  }

  const res = await axios.put("/api/update-blogpost", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const useDeleteBlogPostByPostId = async (blogPostId: string) => {
  try {
    //TODO: Add some kind of authentication token here
    const res = await axios.delete(`/api/delete-blogpost/${blogPostId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};

export const useGetBlogPostByPostId = async (blogPostId: string) => {
  try {
    const res = await axios.get(`/api/blogpost/${blogPostId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};

const prepareContentForUpload = (
  formData: FormData,
  content: BlogPostContent,
) => {
  const contentCopy = {
    contentPieces: content.contentPieces.map((piece) => {
      return {
        ...piece,
      };
    }),
  };
  contentCopy.contentPieces.forEach((piece) => {
    if (piece.type == "image") {
      const imagePiece = piece as BlogPostContentImage;
      if (imagePiece.file != null) {
        formData.append(`imagePieces`, imagePiece.file);
        imagePiece.file = null;
        imagePiece.hasNewFile = true;
      }
    }
  });
  return contentCopy;
};

export const handleEditProfile = async (
  userId: string,
  displayName: string,
  profilePicture: File | null,
  biography: string,
  changedImage: Boolean,
) => {
  try {
    var formData = new FormData();
    if (profilePicture != null && changedImage) {
      formData.append("profileImage", profilePicture, "profileImage.png");
    }
    formData.append("changedImage", String(changedImage));
    formData.append("userId", userId);
    formData.append("displayName", displayName);
    formData.append("biography", biography);
    const res = await axios.put(`/api/edit-profile`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error: any) {
    throw new Error("Problems communicating with the API");
  }
};

const createFormDataBaseForBlogPostChanges = (
  title: string,
  description: string,
  userId: string,
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId);
  return formData;
};

function useBlogPostApi(): [
  () => Promise<BlogPost[]>,
  (userID: string) => Promise<BlogPost[]>,
  (userID: string) => Promise<any>,
  (data: any) => Promise<any>, // TODO: better data types
  (userID: string) => Promise<any>,
] {
  const handleGetAllBlogPosts = async () => {
    try {
      result = await getAllBlogPosts();
      return result;
    } catch (error) {
      throw new Error("No such document");
    }
  };

  const handleGetBlogPostByUserId = async (userID: string) => {
    // userID = doc id to user
    try {
      result = await getBlogPostByUserId(userID);
      return result;
    } catch (error) {
      throw new Error("No such document");
    }
  };

  const handleGetUserDetails = async (userId: string) => {
    try {
      result = await getUserDetails(userId);
      return result;
    } catch (error) {
      throw new Error("No such document");
    }
  };

  const handleCreateUser = async (data: any) => {
    // TODO: appropriate type
    try {
      result = await createUser(data);
      return result;
    } catch (error) {
      throw new Error("Couldn't create user");
    }
  };

  const handleCheckUser = async (userId: string) => {
    try {
      result = await checkUser(userId);
      return result;
    } catch (error) {
      throw new Error("Couldn't check user");
    }
  };

  return [
    handleGetAllBlogPosts,
    handleGetBlogPostByUserId,
    handleGetUserDetails,
    handleCreateUser,
    handleCheckUser,
  ];
}

export default useBlogPostApi;
