export const searchReducer = (state = { text: "" }, action) => {
    switch (action.type) {
        case "SEARCH_FILTER_VALUE":
            return {...state, ...action.payload}
        default:
            return state;
    }
};
