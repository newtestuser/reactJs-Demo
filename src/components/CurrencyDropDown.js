import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Convert} from '../actions/ActionList';
import Select from 'grommet/components/Select';

/**
 * component for currency dropdown which converts total amount of cart items to selected currency
 */
class CurrencyDropDown extends Component {
    constructor() {
        super();
    }

    changeCurrency(event) {
        this
            .props
            .dispatch(Convert(this.props.item.currencyUnit, event.currentTarget.value));

    }
    _
    render() {
        let currency = [];
        for (var curr in this.props.currencyList) {
            currency.push(
                <option value={curr}>{curr}</option>
            );
        }

        return (
            <select
                value={this.props.item.currencyUnit}
                onChange={(e) => {
                this.changeCurrency(e)
            }}>{currency}</select>
        );
    }
}

let select = state => ({currencyList: state.currencyList, item: state.item});

export default connect(select)(CurrencyDropDown);