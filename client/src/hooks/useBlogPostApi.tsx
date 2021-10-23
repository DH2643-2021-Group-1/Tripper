import {
    getBlogPostByUserId,
    getAllBlogPosts,
    setBlogPost,
    getBlogPostByPostId,
    editProfilePage,
    getUserDetails,
    createUser,
} from "../blogpostApi";
import { BlogPost } from "../models/blog-post"

let result: Array<BlogPost>;
let postResult: string;

function useBlogPostApi(): [
    () => Promise<BlogPost[]>,
    (title: string, text: string) => Promise<string>,
    (userID: string) => Promise<BlogPost[]>,
    (blogPostId: string) => Promise<BlogPost[]>,
    (
        userID: string,
        firstName: string,
        lastName: string,
        profilePicture: any,
        biography: string
    ) => Promise<any>,
    (userID: string) => Promise<any>,
    (data: any) => Promise<any>,
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

    const handleSetPost = async (title: string, text: string) => {
        let userRef: string = "320v9d6BBIeCkorfQgjc"; // TODO take as param in handleSetPost
        try {
            postResult = await setBlogPost(title, text, userRef);
            console.log("Set blogpost, result:", postResult);
            return postResult;
        } catch (error) {
            throw new Error("Problems communicating with the API");
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

    const handleCreateUser = async (data: any) => {
        try {
            result = await createUser(data);
            return result;
        } catch (error) {
            throw new Error("Couldn't create user");
        }
    };

    return [
        handleGetAllBlogPosts,
        handleSetPost,
        handleGetBlogPostByUserId,
        handleGetBlogPostByPostId,
        handleEditProfile,
        handleGetUserDetails,
        handleCreateUser,
    ];
}

export default useBlogPostApi;
