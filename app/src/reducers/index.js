import { FETCH_ITEMS, RECEIVED_ITEMS, ADD_SUGGESTION, REMOVE_SUGGESTION } from '../actions';
import { combineReducers } from 'redux';

const items = (state = { loading: false }, action) => {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                loading: true
            };
        case RECEIVED_ITEMS:
            return {
                ...state,
                loading: false,
                items: action.items
            };
        default:
            return state;
    }
};

const suggestions = (state = { suggestions: [] }, action) => {
    switch (action.type) {
        case ADD_SUGGESTION:
            return {
                ...state,
                suggestions: [...state.suggestions, action.suggestion]
            };
        case REMOVE_SUGGESTION:
            return {
                ...state,
                suggestions: [
                    ...state.items.slice(0, action.index),
                    ...state.items.slice(action.index + 1)
                ]
            };
        default:
            return state;
    }
};

export default combineReducers({
    items,
    suggestions
});
