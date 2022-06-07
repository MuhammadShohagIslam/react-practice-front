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
// creating new order with cash on delivery
export const createOrderCashOnDelivery = (
    isCashOnDelivery,
    isCouponed,
    authtoken
) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/user/carts/order/cash`,
        { isCashOnDelivery, isCouponed },
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

// add to whislist
export const addToWhisList = async (authtoken, productId, isWhisList) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/user/whislist`,
        { productId, isWhisList },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// get all whislits from user
export const getWhisLists = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/user/whislists`, {
        headers: {
            authtoken,
        },
    });
};

// get all whislits from user
export const getWhisList = async (authtoken, productId) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/user/whis-list`,
        { productId },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// remove whislist
export const removeWhisList = async (authtoken, productId) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/user/whislist`,
        { productId },
        {
            headers: {
                authtoken,
            },
        }
    );
};
