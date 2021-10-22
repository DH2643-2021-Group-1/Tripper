import axios from "axios"

// TODO send in auth token in headers

// const headers = {
//     'Authorization': 'Bearer my-token',
// };

export const getBlogPostByUserId = async (userId: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/blogpost-from-author/${userId}`);
        console.log("response", res.data)
        return res.data
    } catch (error: any) {
        throw new Error(error) // find appr. error to throw
    }
}

export const getBlogPostByPostId = async (blogpostId: string) => {
    console.log("i api call")
    try {
        const res = await axios.get(`http://localhost:8000/blogpost/${blogpostId}`)
        console.log("response", res.data)
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


export const editProfilePage = async (userId: string, firstName: string, lastName: string, profilePicture: any, biography: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/edit-profile/${userId}/${firstName}/${lastName}/${profilePicture}/${biography}`);
        console.log('response:', res.data)
        return res.data;
    }
    catch (error: any) {
        throw new Error(error);
    }
}

export const getUserDetails = async (userId: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/user/${userId}`);
        console.log('response:', res.data)
        return res.data;
    }
    catch (error: any) {
        throw new Error(error)
    }
}