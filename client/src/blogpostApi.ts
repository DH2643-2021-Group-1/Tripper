import axios from "axios"

// TODO send in auth token in headers


// TODO: getBlogPost by: user??
export const getBlogPost = async () => {
    console.log("getBlobPost")
    try {
        const res = await axios.get("http://localhost:8000/blogposts")
        console.log("response", res.data)
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const setBlogPost = async (title: string, text: string) => {
    // const headers = {
    //     'Authorization': 'Bearer my-token',
    // };
    try {
        const res = await axios.post("http://localhost:8000/blogposts", {
            title: title,
            text: text
        })
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}