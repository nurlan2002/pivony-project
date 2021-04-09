import { SET_SELECTED_INSIGHT, SET_USER_INSIGHT } from "./insight.types";

export const setSelectedInsight = (insight) => {
    return {
        type: SET_SELECTED_INSIGHT,
        payload: insight,
    };
};

export const setUserInsight = (insight) => {
    return {
        type: SET_USER_INSIGHT,
        payload: insight,
    };
};
