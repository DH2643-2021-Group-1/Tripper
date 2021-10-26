import axios from "axios";

// TODO send in auth token in headers

// const headers = {
//     'Authorization': 'Bearer my-token',
// };

export const getBlogPostByUserId = async (userId: string) => {
  try {
    const res = await axios.get(`/api/blogpost-from-author/${userId}`);
    console.log("response", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};

// ? set number of queried posts here? Now it's set in backend
export const getAllBlogPosts = async () => {
  try {
    const res = await axios.get("/api/all-blogposts");
    console.log("response", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};

export const editProfilePage = async (
  userId: string,
  displayName: string,
  profilePicture: any,
  biography: string
) => {
  try {
    const res = await axios.get(
      `/api/edit-profile/${userId}/${displayName}/${profilePicture}/${biography}`
    );
    console.log("response:", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserDetails = async (userId: string) => {
  try {
    const res = await axios.get(`/api/user/${userId}`);
    console.log("response:", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createUser = async (data: any) => {
  try {
    const res = await axios.post("/api/create-user", data);
    console.log("response", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};

export const checkUser = async (userId: string) => {
  // TODO: better name for userId??
  try {
    const res = await axios.get(`/api/check-user/${userId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error); // find appr. error to throw
  }
};
