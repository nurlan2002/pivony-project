import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { saveState } from "./loadState";

import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    saveState(store.getState())
})

export default store;
