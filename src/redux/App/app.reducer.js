import { SET_LOADING, SET_TAB } from "./app.types";

const INITIAL_STATE = {
    loading: false,
    tab: "",
};

const appReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case SET_TAB:
            return {
                ...state,
                tab: action.payload,
            };

        default:
            return state;
    }
};

export default appReducer;
