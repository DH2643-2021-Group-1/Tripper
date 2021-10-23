import axios from "axios";
import {
    getBlogPostByUserId,
    getAllBlogPosts,
    editProfilePage,
    getUserDetails,
} from "../blogpostApi";
import { BlogPost } from "../models/blog-post"
import { BlogPostContent, BlogPostContentPieceAny } from "../models/blog-post-content/blog-post-content";
import { BlogPostContentImage } from "../models/blog-post-content/blog-post-content-image";

let result: Array<BlogPost>;

export const useCreateBlogPost = async (title: string, description: string, primaryImage: File, content: BlogPostContent) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = createFormDataBaseForBlogPostChanges(title, description, userId);
        formData.append("primaryImage", primaryImage, "primaryImage.png");
        const contentPreparedForUpload = prepareContentForUpload(formData, content);
        formData.append("content", JSON.stringify(contentPreparedForUpload));
        const res = await axios.post(
            "/api/create-blogpost",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
        console.log(res);
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const useUpdateBlogPost = async (id: string, title: string, description: string, primaryImage: File | null, content: BlogPostContent) => {
    let userId: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
    try {
        var formData = createFormDataBaseForBlogPostChanges(title, description, userId);
        const contentPreparedForUpload = prepareContentForUpload(formData, content);
        formData.append("id", id);
        formData.append("content", JSON.stringify(contentPreparedForUpload));

        if (primaryImage != null) {
            formData.append("primaryImage", primaryImage, "primaryImage.png");
        }

        const res = await axios.put(
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

const prepareContentForUpload = (formData: FormData, content: BlogPostContent) => {
    const contentCopy = {
        contentPieces: content.contentPieces.map((piece) => {
            return {
                ...piece,
            }
        })
    };
    contentCopy.contentPieces.forEach(piece => {
        if (piece.type == "image") {
            const imagePiece = (piece as BlogPostContentImage);
            if (imagePiece.file != null) {
                formData.append(`imagePieces`, imagePiece.file);
                imagePiece.file = null;
                imagePiece.hasNewFile = true;
            }
        }
    });
    return contentCopy;
}

const createFormDataBaseForBlogPostChanges = ( title: string, description: string, userId: string) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);
    return formData;
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
