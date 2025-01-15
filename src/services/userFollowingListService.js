import * as httpRequest from '~/utils/httpRequest';

export const getFollowingList = async (user_id, count = '8') => {
    try {
        const res = await httpRequest.get('/getUserFollowingList', {
            params: {
                count,
                user_id
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
