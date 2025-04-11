import { getV2 } from "~/utils/httpRequest";


export const getFollowingList = async ({ secUid, count = 5, minCursor = 0, maxCursor = 0 }) => {
    try {
        const res = await getV2('/user/followings', {
            params: {
                secUid,
                count,
                minCursor,
                maxCursor
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
