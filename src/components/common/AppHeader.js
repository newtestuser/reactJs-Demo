import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import ShopIcon from 'grommet/components/icons/base/Shop';

/**
 * Component created for dynamic headers
 */
export default class AppHeader extends Component {

    render() {
        return (
            <Header direction='row' justify='between' fixed={true} size='small'>
                <Title>
                    <ShopIcon type='logo' size='medium' colorIndex='light-1'/> {this.props.title}
                </Title>
                <Box primary={true} flex={true} justify='end' direction='row' responsive={true}>
                    {this.props.items}
                </Box>
            </Header>
        );
    }

}