import axios from "axios";
import {
    getBlogPostByUserId,
    getAllBlogPosts,
    editProfilePage,
    getUserDetails,
} from "../blogpostApi";
import { BlogPost } from "../models/blog-post"
import { BlogPostContent } from "../models/blog-post-content/blog-post-content";
import { BlogPostContentImage } from "../models/blog-post-content/blog-post-content-image";

let result: Array<BlogPost>;

export const useCreateBlogPost = async (title: string, description: string, primaryImage: File, content: BlogPostContent) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);
        formData.append("primaryImage", primaryImage, "primaryImage.png");
        transferContentFilesIntoFormData(formData, content);
        formData.append("content", JSON.stringify(content));
        const res = await axios.post(
            "/api/create-blogpost",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const useUpdateBlogPost = async (id: string, title: string, description: string, primaryImage: File | null, content: BlogPostContent) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);
        transferContentFilesIntoFormData(formData, content);
        console.log(content);
        formData.append("content", JSON.stringify(content));
        if (primaryImage != null) {
            formData.append("primaryImage", primaryImage, "primaryImage.png");
        }
        const res = await axios.post(
            "/api/update-blogpost",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const useGetBlogPostByPostId = async (blogPostId: string) => {
    try {
        const res = await axios.get(`/api/blogpost/${blogPostId}`)
        return res.data;
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
};

const transferContentFilesIntoFormData = (formData: FormData, content: BlogPostContent) => {
    content.contentPieces.forEach(piece => {
        if (piece.type == "image") {
            const imagePiece = (piece as BlogPostContentImage);
            if (imagePiece.file != null) {
                formData.append(`imagePieces`, imagePiece.file);
                imagePiece.file = null;
            }
        }
    })
}


function useBlogPostApi(): [
    () => Promise<BlogPost[]>,
    (userID: string) => Promise<BlogPost[]>,
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
        handleEditProfile,
        handleGetUserDetails,
    ];
}

export default useBlogPostApi;
