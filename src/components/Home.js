import React, {Component} from 'react';
import Article from 'grommet/components/Article';
import AppHeader from './common/AppHeader';
import AppTile from './common/AppTile';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tiles from 'grommet/components/Tiles';
import BasketIcon from 'grommet/components/icons/base/Basket';
import Label from 'grommet/components/Label';
import {getItems, getCurrency} from '../actions/ActionList';
import {connect} from 'react-redux';

/**
 * Home Page for Application with list of items avaialble for user to select
 */
class Home extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this
            .props
            .dispatch(getItems());
        this
            .props
            .dispatch(getCurrency());
    }
    render() {

        //cart icon with total number of items in cart
        const button = <Button icon={< BasketIcon />} path='/cart'>
            <Box>
                <Label margin='none' align='center'>{this.props.cartitem.count}</Label>
            </Box>
        </Button>

        let items;
        if (this.props.item.list != undefined) 
            items = this.props.item.list.map((item, index) => {
                return (
                    <AppTile
                        key={index}
                        id={index}
                        name={item.itemname}
                        price={item.price}
                        qty={item.qty}
                        image={item.display}></AppTile>
                );
            });
        return (
            <Article>
                <AppHeader title='Happy Shopping' items={button}/>
                <Tiles fill={false} flush={false}>{items}</Tiles>

            </Article>
        );
    }
}

let select = (state) => ({item: state.itemList, cartitem: state.item});

export default connect(select)(Home);
