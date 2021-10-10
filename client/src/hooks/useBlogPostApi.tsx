import { getBlogPostById, getAllBlogPosts, setBlogPost } from "../blogpostApi"

interface BlogPost {
    title: string,
    text: string,
}

let result: Array<BlogPost>;
let postResult: string;

function useBlogPostApi(): [() => Promise<BlogPost[]>, (title: string, text: string) => Promise<string>, (userID: string) => Promise<BlogPost[]>] {

    const handleGetAllBlogPosts = async () => {
        try {
            result = await getAllBlogPosts()
            console.log("Get all blogposts, result:", result)
            return result
        }
        catch (error) {
            throw new Error("No such document")
        }
    }

    const handleSetPost = async (title: string, text: string) => {
        let userRef: string = "320v9d6BBIeCkorfQgjc" // TODO take as param in handleSetPost
        try {
            postResult = await setBlogPost(title, text, userRef)
            console.log("Set blogpost, result:", postResult)
            return postResult
        }
        catch (error) {
            throw new Error("Problems communicating with the API")
        }
    }

    const handleGetBlogPostById = async (userID: string) => {
        // userID = doc id to user
        try {
            result = await getBlogPostById(userID)
            console.log("Get blogpost by id, result:", result)
            return result
        }
        catch (error) {
            throw new Error("No such document")
        }
    }



    return [handleGetAllBlogPosts, handleSetPost, handleGetBlogPostById];
}

export default useBlogPostApi;