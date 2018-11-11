import React, {Component} from 'react';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import AppHeader from './common/AppHeader';
import CurrencyDropDown from './CurrencyDropDown';
import {removeItem, Convert} from '../actions/ActionList';
import {connect} from 'react-redux';

/**
 * Componet for Cart Page include:
 *  1) Header : total amount, Currency Change Dropdown and Checkout button
 *  2) List of Items in cart with option to delete
 *  3) Continue Shopping Button
 */
class Cart extends Component {
    constructor(props) {
        super(props);

        this.renderList = this
            .renderList
            .bind(this);
    }

    /**
     * calls action for removing item from cart and recalulate amount in selected currency
     *
     */
    removeItemFromCart(e) {
        this
            .props
            .dispatch(removeItem(e.currentTarget.id));
        this
            .props
            .dispatch(Convert('GBP', this.props.item.currencyUnit));
    }

    /**
     * converting totalamount in selected currency on load
     */
    componentWillMount() {
        this
            .props
            .dispatch(Convert('GBP', this.props.item.currencyUnit));
    }

    renderHeader() {

        let itemString = 'Item';
        if (this.props.item.count > 0) {
            itemString = 'Items';
        }

        //Check for disabling button when no item is present in cart
        let button = <Button label="Checkout" primary={true} path='/checkout'/>;;
        if (this.props.item.count == undefined || this.props.item.count == 0) 
            button = <Button label="Checkout"/>;
        
        const items = [];
        items.push(<CurrencyDropDown/>);
        items.push(button);
        // if (this.props.item != undefined) {
        return (<AppHeader
            title={`Bag Total (${this.props.item.count} ${itemString}): ${this.props.item.displayamt} ${this.props.item.currencyUnit}`}
            items={items}/>);
        // }
    }

    /**
     * returns list of items from cart in ListItem components
     */
    renderList() {

        let items = [];
        if (this.props.item.data != undefined) {
            let data = this.props.item.data;
            for (const [key,
                value]of data.entries()) {
                if (value.qty > 0) {
                    items.push(
                        <ListItem justify='between' separator='horizontal'>
                            <span>
                                {value.name}
                            </span>
                            <span className='secondary'>
                                {value.qty}
                            </span>
                            <span className='secondary'>
                                £{value.totalPrice}
                            </span>
                            <span className='secondary'>
                                <Button id={key} label="Delete" onClick={(e) => this.removeItemFromCart(e)}/>
                            </span>
                        </ListItem>
                    )
                }
            }
            items = <List>{items}</List>;
        }
        return items;
    }

    render() {

        const header = this.renderHeader();
        const list = this.renderList();

        return (
            <Article >
                {header}
                {list}
                <Box pad='small' align='center' direction='column'>
                    <Button icon={< LinkPreviousIcon />} label="continue Shopping" path='/'/>
                </Box>
            </Article>
        );
    }
}

let select = (state, props) => ({item: state.item, currencyList: state.currencyList});

export default connect(select)(Cart);
