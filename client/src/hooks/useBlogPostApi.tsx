import { getBlogPost, setBlogPost } from "../blogpostApi"

interface BlogPost {
    title: string,
    text: string,
}

let result: Array<BlogPost>;
let postResult: string; // backend should return array of results in all cases, create types for different return types

export default () => {

    const handleGetBlogPost = async () => {
        console.log("handleblog")
        try {
            result = await getBlogPost()
            console.log("Get blogpost result:", result)
            return result
        }
        catch (error) {
            throw new Error("No such document")
        }
    }

    const handleSetPost = async (title: string, text: string) => {
        try {
            postResult = await setBlogPost(title, text)
            console.log("Set blogpost result:", postResult)
            return postResult
        }
        catch (error) {
            throw new Error("Problems communicating with the API")
        }
    }

    return [handleGetBlogPost, handleSetPost]
    //return [handleGetBlogPost]
}

