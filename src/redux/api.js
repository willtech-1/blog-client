import axios from 'axios';

const dotEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({ baseURL: `${ dotEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}` });

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const signIn = (formData) => API.post("/users/signin", formData)

export const signUp = (formData) => API.post("/users/signup", formData)

export const googleSignIn = (result) => API.post("/users/googleSignIn", result)

export const createBlog = (blogData) =>  API.post("/blog", blogData)

export const getBlogs = () =>  API.get("/blog")

export const getBlog = (id) =>  API.get(`/blog/${id}`)

export const deleteBlog = (id) =>  API.delete(`/blog/${id}`)

export const updateBlog = (updatedBlogData, id) =>  API.patch(`/blog/${id}`, updatedBlogData)

export const getBlogsByUser = (userId) =>  API.get(`/blog/userBlogs/${userId}`) 

export const getBlogsBySearch = (searchQuery) =>
  API.get(`/blog/search?searchQuery=${searchQuery}`);

export const getTagBlogs = (tag) =>  API.get(`/blog/tag/${tag}`)

export const getRelatedBlogs = (tags) => API.post(`/blog/relatedBlogs`, tags);

export const likeBlog = (id) => API.patch(`/blog/like/${id}`);