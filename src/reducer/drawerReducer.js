export const drawerReducer = (state = false, action) => {
    switch (action.type) {
        case "VISIBLE_DRAWER":
            return action.payload;
        default:
            return state;
    }
};
