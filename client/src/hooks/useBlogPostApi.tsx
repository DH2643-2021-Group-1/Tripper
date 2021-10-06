import { getBlogPost, setBlogPost } from "../blogpostApi"

interface BlogPost {
    title: string,
    text: string,
}

let result: Array<BlogPost>;
let postResult: string; // backend should return array of results in all cases, create types for different return types

function useBlogPostApi(): [() => Promise<BlogPost[]>, (title: string, text: string) => Promise<string>] {

    const handleGetBlogPost = async () => {
        try {
            result = await getBlogPost()
            console.log("Get blogpost, result:", result)
            return result
        }
        catch (error) {
            throw new Error("No such document")
        }
    }

    // TODO should take userRef as param
    const handleSetPost = async (title: string, text: string) => {
        let userRef: string = "320v9d6BBIeCkorfQgjc"
        try {
            postResult = await setBlogPost(title, text, userRef)
            console.log("Set blogpost, result:", postResult)
            return postResult
        }
        catch (error) {
            throw new Error("Problems communicating with the API")
        }
    }

    return [handleGetBlogPost, handleSetPost];
}

export default useBlogPostApi;