import { getV2 } from '~/utils/httpRequest'

export const userPlayList = async (secUid, count, cursor) => {
    try {
        const res = await getV2('user/playlist', {
            params: {
                secUid,
                count,
                cursor
            }
        })
        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
}