let initialState = {
    carts: [],
    shippingAddress: {},
    isCouponed: false,
    isCashOnDelivery: false,
};

//  to add data from window local storage to the inital state
if (typeof window !== "undefined") {
    if (window.localStorage.getItem("carts")) {
        initialState.carts = JSON.parse(window.localStorage.getItem("carts"));
    } else {
        initialState.carts = [];
    }
    if (window.localStorage.getItem("shippingAddress")) {
        initialState.shippingAddress = JSON.parse(
            window.localStorage.getItem("shippingAddress")
        );
    } else {
        initialState.shippingAddress = {};
    }
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state,
                carts: action.payload,
            };
        case "ADD_SHIPPING_ADDRESS":
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case "ADD_COUPON":
            return {
                ...state,
                isCouponed: action.payload,
            };
        case "CASH_ON_DELIVERY":
            return {
                ...state,
                isCashOnDelivery: action.payload,
            };
        default:
            return state;
    }
};
