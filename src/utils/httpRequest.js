import axios from "axios";

const httpRequestV1 = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_V1,
    headers: {
        [import.meta.env.VITE_TITLE_KEY]: import.meta.env.VITE_KEY,
        [import.meta.env.VITE_TITLE_HOST]: import.meta.env.VITE_HOST_V1,
    }
});

const httpRequestV2 = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_V2,
    headers: {
        [import.meta.env.VITE_TITLE_KEY]: import.meta.env.VITE_KEY,
        [import.meta.env.VITE_TITLE_HOST]: import.meta.env.VITE_HOST_V2,
    }
});

export const getV1 = async (path, options = {}) => {
    const response = await httpRequestV1.get(path, options);
    return response.data;
};

export const getV2 = async (path, options = {}) => {
    const response = await httpRequestV2.get(path, options);
    return response.data;
};

export { httpRequestV1, httpRequestV2 };
