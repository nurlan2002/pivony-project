import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import appReducer from "./App/app.reducer";
import insightReducer from "./Insight/insight.reducer";

const rootReducer = combineReducers({
    userReducer,
    appReducer,
    insightReducer
});

export default rootReducer;