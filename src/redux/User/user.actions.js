import { auth } from "../../firebase";
import { SET_LOADING } from "../App/app.types";
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

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const signUpUser = (email, password) => (dispatch) => {
    dispatch({ type: SIGNUP_PENDING });
    dispatch({ type: SET_LOADING, payload: true });
    auth.createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            await userCredential.user.updateProfile({
                displayName: "Anonymus",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/pivony-project.appspot.com/o/avatar-1577909.svg?alt=media&token=b6a86346-39cd-4a57-b117-844ec31494c9",
            });
            dispatch({ type: SIGNUP_SUCCESS, payload: userCredential.user });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            dispatch({ type: SIGNUP_FAILED, payload: error.message });
            dispatch({ type: SET_LOADING, payload: false });
        });
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT_PENDING });
    dispatch({ type: SET_LOADING, payload: true });
    auth.signOut()
        .then(() => {
            dispatch({ type: LOGOUT_SUCCESS });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            dispatch({ type: LOGOUT_FAILED, payload: error.message });
            dispatch({ type: SET_LOADING, payload: false });
        });
};

export const loginUser = (email, password) => (dispatch) => {
    dispatch({ type: LOGIN_PENDING });
    dispatch({ type: SET_LOADING, payload: true });
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            dispatch({ type: LOGIN_FAILED, payload: error.message });
            dispatch({ type: SET_LOADING, payload: false });
        });
};
