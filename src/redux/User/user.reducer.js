import {
    SET_USER,
    LOGOUT,
    LOGIN,
    SIGNUP,
} from "./user.types";

const INITIAL_STATE = {
    user: null
};

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload
            };

        case SIGNUP:
            return {
                ...state,
                user: action.payload
            };

        case LOGOUT:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
};

export default userReducer;
