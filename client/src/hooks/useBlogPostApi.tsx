import axios from "axios";
import {
    getBlogPostByUserId,
    getAllBlogPosts,
    getBlogPostByPostId,
    editProfilePage,
    getUserDetails,
} from "../blogpostApi";
import { BlogPost } from "../models/blog-post"

let result: Array<BlogPost>;
let postResult: string;

export const useCreateBlogPost = async (title: string, description: string, primaryImage: File) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);
        formData.append("primaryImage", primaryImage, "primaryImage.png");
        const res = await axios.post(
            "api/create-blogpost",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const useUpdateBlogPost = async (id: string, title: string, description: string, primaryImage: File) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);
        formData.append("primaryImage", primaryImage, "primaryImage.png");
        const res = await axios.post(
            "api/update-blogpost",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}


function useBlogPostApi(): [
    () => Promise<BlogPost[]>,
    (userID: string) => Promise<BlogPost[]>,
    (blogPostId: string) => Promise<BlogPost[]>,
    (
        userID: string,
        firstName: string,
        lastName: string,
        profilePicture: any,
        biography: string
    ) => Promise<any>,
    (userID: string) => Promise<any>
] {
    const handleGetAllBlogPosts = async () => {
        try {
            result = await getAllBlogPosts();
            console.log("Get all blogposts, result:", result);
            return result;
        } catch (error) {
            throw new Error("No such document");
        }
    };

    const handleGetBlogPostByUserId = async (userID: string) => {
        // userID = doc id to user
        try {
            result = await getBlogPostByUserId(userID);
            console.log("Get blogpost by id, result:", result);
            return result;
        } catch (error) {
            throw new Error("No such document");
        }
    };

    const handleGetBlogPostByPostId = async (blogPostId: string) => {
        try {
            result = await getBlogPostByPostId(blogPostId);
            console.log("Get blogpost by post id, result:", result);
            return result;
        } catch (error) {
            throw new Error("No such document");
        }
    };

    const handleEditProfile = async (
        userId: string,
        firstName: string,
        lastName: string,
        profilePicture: any,
        biography: string
    ) => {
        try {
            result = await editProfilePage(
                userId,
                firstName,
                lastName,
                profilePicture,
                biography
            );
            console.log("Updated profile:", result);
            return result;
        } catch (error) {
            throw new Error("Problems communicating with the API");
        }
    };

    const handleGetUserDetails = async (userId: string) => {
        try {
            result = await getUserDetails(userId);
            console.log("User details: ", result);
            return result;
        } catch (error) {
            throw new Error("No such document");
        }
    };

    return [
        handleGetAllBlogPosts,
        handleGetBlogPostByUserId,
        handleGetBlogPostByPostId,
        handleEditProfile,
        handleGetUserDetails,
    ];
}

export default useBlogPostApi;
