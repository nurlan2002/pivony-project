import {
    SET_USER,
    LOGOUT_PENDING,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_PENDING,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
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

        case LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
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

        case SIGNUP_FAILED:
            return {
                ...state,
                error: action.payload,
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

        case LOGOUT_FAILED:
            return {
                ...state,
                error: action.payload,
                isPending: false,
            };

        default:
            return state;
    }
};

export default userReducer;
