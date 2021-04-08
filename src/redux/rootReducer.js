import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
    userReducer
});

export default rootReducer;