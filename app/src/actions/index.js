import fetch from '../data/fetch';
import * as Config from '../config';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const RECEIVED_ITEMS = 'RECEIVED_ITEMS';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';

export const fetchItems = () => ({
    type: FETCH_ITEMS
});

export const fetchData = (dispatch) => {
    dispatch(fetchItems());
    return fetch(Config.MATCHING_TITLES).then((items) => {
        dispatch(receivedItems(items))
    });
};

export const receivedItems = items => ({
    type: RECEIVED_ITEMS,
    items
});

export const addSuggestion = (suggestion) => ({
    type: ADD_SUGGESTION,
    suggestion
});

export const removeSuggestion = (index) => ({
    type: ADD_SUGGESTION,
    index
});