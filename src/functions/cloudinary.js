import axios from "axios";

export const uploadingImageFile = (authtoken, uploadImageFile) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/uploadImages`,
        { uploadImageFile },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const deletingImageFile = (authtoken, public_id) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/deleteImages`,
        { public_id },
        {
            headers: {
                authtoken,
            },
        }
    );
};
