import axios from "axios";

const httpUrl = process.env.REACT_APP_HOST

export const usePost = (url) => {
    const fullUrl = httpUrl + url;

    const post = (data, posts, setPosts, callback) => {
        const newPost = {...data, id: posts.length + 1};

        axios.post(fullUrl, newPost)
            .then((response) => {
                setPosts((prev) => [...prev, response.data]);
                callback?.();
            });
    }

    return {post};
}