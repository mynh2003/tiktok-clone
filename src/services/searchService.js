import * as httpRequest from '~/utils/httpRequest';

export const search = async (keywords, count = '10', cursor = 0) => {
    try {
        const res = await httpRequest.get('/user/search', {
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
