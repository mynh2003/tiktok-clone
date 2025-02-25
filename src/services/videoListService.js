import * as httpRequest from '~/utils/httpRequest';

export const videoList = async (keywords, region = 'VN', count = '9') => {
    try {
        const res = await httpRequest.get('/feed/list', {
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