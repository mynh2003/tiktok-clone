import { getV2 } from "~/utils/httpRequest";

export const userInfo = async (uniqueId) => {
    try {
        return await getV2('/user/info', {
            params: { uniqueId }
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};