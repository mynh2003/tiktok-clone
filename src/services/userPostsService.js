import { getV1 } from "~/utils/httpRequest";

export const userPosts = async (unique_id, user_id, count, cursor) => {
    try {
        const res = await getV1('user/posts', {
            params: {
                unique_id,
                user_id,
                count,
                cursor
            }
        })
        return res
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}