import React, {Component} from 'react';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Card from 'grommet/components/Card';
import Footer from 'grommet/components/Footer';
import {addItem} from '../../actions/ActionList';
import {connect} from 'react-redux';

/**
 * Tile component to render individual items 
 */
class AppTile extends Component {
    constructor(props) {
        super(props);
    }
    AddItem() {
        this
            .props
            .dispatch(addItem(this.props.id));
    }
    render() {
        return (
            <Tile
                colorIndex='neutral-1'
                wide={false}
                size='small'
                pad={{
                horizontal: 'small',
                vertical: 'small'
            }}>
                <Box direction='column'>
                    <Image size='small' src={this.props.image} full={true}></Image>
                    <Label margin='none' align='center'>{this.props.name}</Label>
                    <Label margin='none' align='center'>{this.props.qty}</Label>
                    <Label margin='none' align='center'>{this.props.price}</Label>
                    <Button label='Add' onClick={(e) => this.AddItem(e)}></Button>
                </Box>
            </Tile>
        );
    }
}

export default connect()(AppTile);
