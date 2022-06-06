import axios from "axios";

// getting all orders
export const getOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
        headers: {
            authtoken,
        },
    });

// updating order status by the admin 
export const updateOrderStatus = async (authtoken, orderId, orderStatus) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/orders/order-status`,
        {
            orderId,
            orderStatus,
        },
        {
            headers: {
                authtoken,
            },
        }
    );
};
