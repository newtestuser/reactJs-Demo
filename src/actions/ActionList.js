import {
    getItemList,
    addToCartList,
    removeFromCartList,
    getCurrencyList,
    convertCurrency,
    updateCurrency,
    resetCartList
} from '../api/AppApi';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_CURR_SUCCESS = 'GET_CURR_SUCCESS';
export const GET_CURR_FAILURE = 'GET_CURR_FAILURE';
export const GET_CURR_RATE_SUCCESS = 'GET_CURR_RATE_SUCCESS';
export const RESET_CART_SUCCESS = 'RESET_CART_SUCCESS';

/* Calls API for adding an item in cart by ID
    in : item id
    out: Type for Reducer and Updated cartlist
*/
export function addItem(id) {
    return {type: ADD_ITEM, cartList: addToCartList(id)};
}

/* Calls API for removing an item from cart by ID
    in : item id
    out: Type for Reducer and Updated cartlist
*/

export function removeItem(id) {
    return {type: REMOVE_ITEM, cartList: removeFromCartList(id)};
}

// returns list of items for homePage
export function getItems() {
    return {type: GET_ITEM_SUCCESS, items: getItemList()};
}

//Calls API for getting list of Currencies
export function getCurrency() {
    return function (dispatch) {
        getCurrencyList().then(response => {
            if (response.success) 
                dispatch({type: GET_CURR_SUCCESS, response: response.currencies});
            else 
                dispatch({type: GET_CURR_FAILURE, error});
            }
        ).catch(error => dispatch({type: GET_CURR_FAILURE, error}));
    };
}

//Calls API to Reset all elements of Application
export function resetApp() {
    return {type: RESET_CART_SUCCESS, cartList: resetCartList()}
}

/*
    calls API to get current exchange rate
    converts total amount to required currency from 'GBP' as base currency
*/

export function Convert(fromCurr, ToCurr) {

    return function (dispatch) {
        convertCurrency('GBP', ToCurr).then(response => {
            if (response.success) {
                dispatch({
                    type: GET_CURR_RATE_SUCCESS,
                    response: updateCurrency(response, 'GBP', ToCurr)
                });
            } else 
                dispatch({type: GET_CURR_FAILURE, error});
            }
        ).catch(error => dispatch({type: GET_CURR_FAILURE, error}));
    };
}