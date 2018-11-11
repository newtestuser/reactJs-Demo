import {
    ADD_ITEM,
    REMOVE_ITEM,
    GET_ITEM_SUCCESS,
    GET_CURR_SUCCESS,
    GET_CURR_FAILURE,
    GET_CURR_RATE_SUCCESS,
    RESET_CART_SUCCESS
} from '../actions/ActionList';

const initialState = {
    item: {
        'count': 0,
        'amt': 0,
        'displayamt': 0,
        'currencyUnit': 'GBP'
    },
    itemList: {},
    currencyList: {
        "GBP": "Pounds"
    }
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
        case 'REMOVE_ITEM':
        case 'RESET_CART_SUCCESS':
            return {
                ...state,
                item: action.cartList
            };
        case 'GET_ITEM_SUCCESS':
            return {
                ...state,
                itemList: action.items
            };
        case 'GET_CURR_SUCCESS':
            return {
                ...state,
                currencyList: action.response
            }
        case 'GET_CURR_RATE_SUCCESS':
            return {
                ...state,
                item: action.response
            }
        default:
            return state;
    }
}

export default AppReducer;