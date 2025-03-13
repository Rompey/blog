import axios from "axios";

const httpUrl = process.env.REACT_APP_HOST

export const useMutations = (url, updateData) => {
    const fullUrl = httpUrl + url;

    const create = (newData, callback) => {
        axios.post(fullUrl, newData)
            .then((response) => {
                updateData((prev) => [...prev, response.data]);
                callback?.();
            });
    };

    const update = (id, newData, callback) => {
        axios.put(`${fullUrl}/${id}`, newData)
            .then(() => {
                updateData((prev) =>
                    prev.map((item) => (item.id === id ? { ...item, ...newData } : item))
                );
                callback?.();
            });
    };

    const remove = (id) => {
        axios.delete(`${fullUrl}/${id}`)
            .then(() => {
                updateData((prev) => prev.filter((item) => item.id !== id));
            });
    };

    return { create, update, remove };
};