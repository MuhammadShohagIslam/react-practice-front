import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

// multiple reducer combine all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
});

export default rootReducer;
