import { SET_SELECTED_INSIGHT, SET_USER_INSIGHT } from "./insight.types";

const INITIAL_STATE = {
    selectedInsight: null,
    userInsight: null
};

const insightReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_SELECTED_INSIGHT:
            return {
                ...state,
                selectedInsight: action.payload,
            };

        case SET_USER_INSIGHT:
            return {
                ...state,
                userInsight: action.payload,
            };

        default:
            return state;
    }
};

export default insightReducer;
