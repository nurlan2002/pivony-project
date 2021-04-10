import { auth } from "../../firebase";
import { SET_LOADING } from "../App/app.types";
import {
    SET_USER,
    LOGOUT,
    LOGIN,
    SIGNUP,
} from "./user.types";
import { toast } from "react-toastify";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const signUpUser = (email, password) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    auth.createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            await userCredential.user.updateProfile({
                displayName: "Anonymus",
                photoURL:
                    "https://firebasestorage.googleapis.com/v0/b/pivony-project.appspot.com/o/avatar-1577909.svg?alt=media&token=b6a86346-39cd-4a57-b117-844ec31494c9",
            });
            dispatch({ type: SIGNUP, payload: userCredential.user });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({ type: SET_LOADING, payload: false });
        });
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    auth.signOut()
        .then(() => {
            dispatch({ type: LOGOUT });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({ type: SET_LOADING, payload: false });
        });
};

export const loginUser = (email, password) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            dispatch({ type: LOGIN, payload: userCredential.user });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((error) => {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({ type: SET_LOADING, payload: false });
        });
};
