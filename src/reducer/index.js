import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

// multiple reducer combine all the reducers
const rootReducer = combineReducers({
   user: userReducer
});

export default rootReducer;
