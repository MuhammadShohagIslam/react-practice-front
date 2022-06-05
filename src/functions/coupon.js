import axios from "axios";

// creating new coupon
export const creatingCoupon = async (
    authtoken,
    couponName,
    discount,
    expireDate
) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/coupon`,
        { couponName, discount, expireDate },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// getting list of coupon
export const getListOfCoupons = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/coupons`, {
        headers: {
            authtoken,
        },
    });
};

// removing single coupon by couponId
export const removingCoupon = async (authtoken, couponId) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/coupons/${couponId}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};
