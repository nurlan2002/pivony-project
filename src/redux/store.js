import { createStore, applyMiddleware } from "redux";

import { createLogger } from "redux-logger";

import thunkMiddleware from "redux-thunk";
import { saveState } from "./loadState";

import rootReducer from "./rootReducer";

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

store.subscribe(() => {
    saveState(store.getState())
})

export default store;
