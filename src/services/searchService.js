import { getV1 } from "~/utils/httpRequest";


export const search = async (keywords, count = '10', cursor = 0) => {
    try {
        const res = await getV1('/user/search', {
            params: {
                keywords,
                count,
                cursor
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
