import React, {Component} from 'react';
import {connect} from 'react-redux';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

import AppHeader from './common/AppHeader';
import CurrencyDropDown from './CurrencyDropDown';
import {resetApp} from '../actions/ActionList';

/**
 * Componet for Checkout Page includes:
 *  1) Header : total amount, Currency Change Dropdown
 *  2) List of Items shooped
 *  3) Edit cart : allows user to add/remove cart items
 *  4) Finish : takes user to home page with defaults i.e. empty cart and currency GBP
 */
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.renderTable = this
            .renderTable
            .bind(this);
    }

    //Called on click of finish ro reset application with defaults
    resetApplication() {
        this
            .props
            .dispatch(resetApp());
    }

    //renders list of items selected in table format displayed on click of accordion
    renderTable() {

        let items = [];
        if (this.props.item.data != undefined) {
            items.push(
                <thead>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
            );
            let data = this.props.item.data;
            for (const [key,
                value]of data.entries()) {
                if (value.qty > 0) {
                    items.push(
                        <tr>
                            <td>
                                {value.name}
                            </td>
                            <td className='secondary'>
                                {value.qty}
                            </td>
                            <td className='secondary'>
                                £{value.totalPrice}
                            </td>
                        </tr>
                    )
                }
            }
            items = <Table>{items}</Table>;
        }
        return items;
    }

    render() {
        const list = this.renderTable();
        return (
            <div>
                <AppHeader title='Your Order is Confirmed' items={< CurrencyDropDown />}/>
                <Accordion >
                    <AccordionPanel
                        heading={`Total Amount :${this.props.item.displayamt} ${this.props.item.currencyUnit}`}>
                        {list}
                    </AccordionPanel>
                </Accordion>
                <Box justify='center' pad='large' direction='row'>
                    <Button label="Edit Cart" path='/cart'/>
                    <Button
                        label="Finish"
                        primary={true}
                        path='/'
                        onClick={() => {
                        this.resetApplication();
                    }}/>
                </Box>
            </div>
        );
    }
}

let select = (state, props) => ({item: state.item, currencyList: state.currencyList});

export default connect(select)(Checkout);