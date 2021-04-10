import {
    SET_USER,
    LOGOUT_PENDING,
    LOGOUT_SUCCESS,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    SIGNUP_PENDING,
    SIGNUP_SUCCESS,
} from "./user.types";

const INITIAL_STATE = {
    user: null,
    isPending: false,
    error: null,
};

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case LOGIN_PENDING:
            return {
                ...state,
                isPending: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isPending: false,
            };

        case SIGNUP_PENDING:
            return {
                ...state,
                isPending: true,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isPending: false,
            };

        case LOGOUT_PENDING:
            return {
                ...state,
                isPending: true,
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isPending: false,
            };

        default:
            return state;
    }
};

export default userReducer;
