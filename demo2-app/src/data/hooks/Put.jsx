import axios from "axios";

const httpUrl = process.env.REACT_APP_HOST

export const usePut = (url) => {
    const fullUrl = httpUrl + url;

    const put = (postId, data, setPosts, callback) => {
        axios.put(`${fullUrl}/${postId}`, data)
            .then(() => {
                setPosts((prev) => prev.map(post => post.id === postId ? {...post, ...data} : post));
                callback?.();
            });
    }

    return {put}
}
