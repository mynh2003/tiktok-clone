import * as httpRequest from '~/utils/httpRequest';

export const getFollowingList = async (user_id, count = '8', time = 0) => {
    try {
        const res = await httpRequest.get('/user/following', {
            params: {
                user_id,
                count,
                time,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
