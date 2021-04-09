import { SET_LOADING, SET_TAB } from "./app.types";

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading,
    };
};

export const setTab = (tab) => {
    return {
        type: SET_TAB,
        payload: tab,
    };
};
