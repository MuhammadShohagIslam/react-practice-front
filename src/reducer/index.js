import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";

// multiple reducer combine all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    userCarts: cartReducer,
    drawer: drawerReducer,
});

export default rootReducer;
