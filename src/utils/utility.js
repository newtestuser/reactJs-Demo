
/**
 * add item in cart list and update total amount in cart
 * @param {*} id : Item ID
 * @param {*} items : List of Items
 */
export function addData(id, items) {
    let itemObject = items
        .data
        .get(parseInt(id));
    if (itemObject != undefined) {
        ++itemObject.qty;
        ++items.count;
        itemObject.totalPrice = parseFloat((itemObject.price + itemObject.totalPrice).toFixed(2));
        items.gbpamt = parseFloat((items.gbpamt + itemObject.price).toFixed(2));
        items
            .data
            .set(parseInt(id), itemObject);
    }
    return items;
};

/**
 * Empties cart list and resets currency to default
 * @param {*} items : Cart List
 */
export const emptyCart = function (items) {
    for (const [key,
        value]of items.data.entries()) {
        while (value.qty > 0) 
            removeData(key, items);
        }
    items.currencyUnit = 'GBP';
    return items;
}

/**
 * remove item in cart list and update total amount in cart
 * @param {*} id : Item ID
 * @param {*} items : List of Items
 */
export const removeData = function (id, items) {
    let itemObject = items
        .data
        .get(parseInt(id));

    if (itemObject != undefined) {
        --itemObject.qty;
        --items.count;
        itemObject.totalPrice = parseFloat((itemObject.totalPrice - itemObject.price).toFixed(2));
        items.gbpamt = parseFloat((items.gbpamt - itemObject.price).toFixed(2));
        items
            .data
            .set(parseInt(id), itemObject);
    }
    return items;
};

/**
 * updates total amount from cart list to the currency selected
 * @param {*} quotes : exchange rates for selected currencies
 * @param {*} from : from Currency ('GBP')
 * @param {*} to : new currency selected
 * @param {*} items : cartlist
 */
export const calculate = function (quotes, from, to, items) {
    var oldCurrRate = quotes['USD' + from];
    var newCurrRate = quotes['USD' + to];
    items.displayamt = parseFloat((items.gbpamt * newCurrRate / oldCurrRate).toFixed(2));
    items.currencyUnit = to;
    return items;
};