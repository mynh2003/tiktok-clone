import { getV1 } from "~/utils/httpRequest";


export const videoList = async (keywords, region = 'VN', count = '9') => {
    try {
        const res = await getV1('/feed/list', {
            params: {
                keywords,
                region,
                count
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};