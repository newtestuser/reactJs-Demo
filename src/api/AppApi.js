import peas from '../images/peas.png';
import milk from '../images/milk.png';
import eggs from '../images/eggs.png';
import beans from '../images/beans.png';
import {addData, removeData, calculate, emptyCart} from '../utils/utility';
import {headers, processStatus} from 'grommet/utils/Rest';

const data = new Map();
data.set(0, {
    name: 'Peas',
    qty: 0,
    unit: '1 Packet',
    price: 0.35,
    totalPrice: 0
});
data.set(1, {
    name: 'Eggs',
    qty: 0,
    unit: '1 Dozen',
    price: 2.10,
    totalPrice: 0
});
data.set(2, {
    name: 'Milk',
    qty: 0,
    unit: '1 bottle',
    price: 1.30,
    totalPrice: 0
});
data.set(3, {
    name: 'Beans',
    qty: 0,
    unit: '1 Can',
    price: 0.73,
    totalPrice: 0
});

let cartList = {
    'count': 0,
    'gbpamt': 0,
    'displayamt': 0,
    'currencyUnit': 'GBP',
    'data': data
};

export const addToCartList = (id) => {
    let newlist = addData(id, cartList);
    return {
        ...cartList,
        ...newlist
    };
}

export const removeFromCartList = (id) => {
    let newlist = removeData(id, cartList);
    return {
        ...cartList,
        ...newlist
    };
}

export const resetCartList = () => {
    let newlist = emptyCart(cartList);
    return {
        ...cartList,
        ...newlist
    };
}

export const getItemList = function () {
    return ({
        "list": [
            {
                'itemname': 'Peas',
                'qty': '1 packet',
                'price': '0.35 GBP',
                'display': peas
            }, {
                'itemname': 'Eggs',
                'qty': '1 dozen',
                'price': '2.10 GBP',
                'display': eggs
            }, {
                'itemname': 'Milk',
                'qty': '1 bottle',
                'price': '1.30 GBP',
                'display': milk
            }, {
                'itemname': 'Beans',
                'qty': '1 Can',
                'price': '0.73 GBP',
                'display': beans
            }
        ]
    });
}

export const getCurrencyList = function () {
    const options = {
        method: 'GET',
        headers
    };
    return fetch('http://apilayer.net/api/list?access_key=48bca77870ee3d072ffef5d98ac95593')
        .then(processStatus)
        .then(response => response.json());

}

export const convertCurrency = function (from, to) {
    const options = {
        method: 'GET',
        headers
    };
    return fetch(`http://apilayer.net/api/live?access_key=48bca77870ee3d072ffef5d98ac95593&currencies=${from},${to}&source=USD`)
        .then(processStatus)
        .then(response => response.json());

}

export const updateCurrency = function (resp, from, to) {
    {
        let quotes = resp.quotes;
        let newlist = calculate(quotes, from, to, cartList);

        return {
            ...cartList,
            ...newlist
        }
    };
}
