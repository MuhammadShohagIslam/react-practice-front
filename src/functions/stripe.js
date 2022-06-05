import axios from "axios";

export const createPaymentIntent = async (authtoken, isCouponed) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/create-payment-intent`,
        { isCouponed },
        {
            headers: {
                authtoken,
            },
        }
    );
};
