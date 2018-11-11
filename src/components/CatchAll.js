import React, {Component} from 'react';
import Button from 'grommet/components/Button';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';

export default class CatchAll extends Component {
    render() {
        return (
            <Article>
                <Box  align='center'>
                <Header>
                    Incorrect Path</Header>
                <Box>
                    <Button label='Take me to Home Page' path='/'></Button>
                </Box>
                </Box>
            </Article>
        );
    }
}