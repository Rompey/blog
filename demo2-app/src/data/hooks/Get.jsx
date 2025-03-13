import axios from "axios";

const httpUrl = process.env.REACT_APP_HOST

export const useGets = (url) => {

    const fullUrl = httpUrl + url

    const get = (setPosts) => {
        axios.get(fullUrl)
            .then((response) => setPosts(response.data));
    }

    return {get}
}