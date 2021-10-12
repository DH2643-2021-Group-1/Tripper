import axios from "axios"

// TODO send in auth token in headers

// const headers = {
//     'Authorization': 'Bearer my-token',
// };

export const getBlogPostByUserId = async (userId: string) => {
    try {
        const res = await axios.get("http://localhost:8000/blogpost-from-author/:userId", {
            params: {
                userId: userId
            }
        })
        console.log("response", res.data)
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const getBlogPostByPostId = async (blogpostId: string) => {
    try {
        const res = await axios.get("http://localhost:8000/blogpost/:blogpostId", {
            params: {
                blogpostId: blogpostId
            }
        })
        console.log("response", res.data)
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const setBlogPost = async (title: string, text: string, userRef: string) => {
    try {
        const res = await axios.post("http://localhost:8000/create-blogpost", {
            title: title,
            text: text,
            userRef: userRef
        })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

// ? set number of queried posts here? Now it's set in backend
export const getAllBlogPosts = async () => {
    try {
        const res = await axios.get("http://localhost:8000/all-blogposts")
        console.log("response", res.data)
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}