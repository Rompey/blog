import axios from "axios";

const httpUrl = process.env.REACT_APP_HOST

export const useDelete = (url) => {
    const fullUrl = httpUrl + url;

    const remove = (id, setPosts) => {
        axios.delete(`${fullUrl}/${id}`)
            .then(() => setPosts((prev) => prev.filter(post => post.id !== id)));
    }

    return {remove};
}
