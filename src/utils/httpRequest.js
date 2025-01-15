import axios from "axios";

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        [import.meta.env.VITE_TITLE_KEY]: import.meta.env.VITE_KEY,
        [import.meta.env.VITE_TITLE_HOST]: import.meta.env.VITE_HOST,
    }
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
