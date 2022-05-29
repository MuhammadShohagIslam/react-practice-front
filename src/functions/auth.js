import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/create-or-update-user`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const adminUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/admin-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};