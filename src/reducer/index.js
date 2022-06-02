import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";

// multiple reducer combine all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    carts: cartReducer,
});

export default rootReducer;
