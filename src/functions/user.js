import axios from "axios";

export const saveOrder = (carts, authtoken) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/user/cart`,
        {
            carts,
        },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveShippingAddress = (addressValues, authtoken) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/user/address`,
        addressValues,
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getUserShippingAddress = (authtoken) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/shipping-address`, {
        headers: {
            authtoken,
        },
    });
};

export const getUserCart = (authtoken) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/cart`, {
        headers: {
            authtoken,
        },
    });
};

export const emptyCart = (authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/user/cart`, {
        headers: {
            authtoken,
        },
    });
};

// getting discount price
export const getTotalPriceAfterDiscount = (couponName, authtoken) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/user/cart/coupon`,
        { couponName },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// creating new order with payment intants
export const createOrder = (paymentIntents, authtoken) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/user/carts/order`,
        { paymentIntents },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// getting all orders by user
export const getOrdersByUser = async (authtoken) => {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}/user/carts/orders`,
        {
            headers: {
                authtoken,
            },
        }
    );
};
