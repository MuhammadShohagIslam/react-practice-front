import axios from "axios";

export const uploadingImageFile = (authtoken, uploadImageFile) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/upload-images`,
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
        `${process.env.REACT_APP_API_URL}/delete-images`,
        { public_id },
        {
            headers: {
                authtoken,
            },
        }
    );
};
