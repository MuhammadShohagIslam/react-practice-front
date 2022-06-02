let initialState = [];

//  to add data from window local storage to the inital state
if (typeof window !== "undefined") {
    if (window.localStorage.getItem("carts")) {
        initialState = JSON.parse(window.localStorage.getItem("carts"));
    } else {
        initialState = [];
    }
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            return action.payload;
        default:
            return state;
    }
};
