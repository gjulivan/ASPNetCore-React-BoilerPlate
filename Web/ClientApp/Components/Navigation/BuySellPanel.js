import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainStyle from '../../Style/MainStyle';

class BuySellPanel extends Component {
    render() {
        return (
            <Button.Group>
                <Button animated as={Link} to='/buy' size='huge' style={MainStyle.buysellpanel}>
                    <Button.Content visible>buy</Button.Content>
                    <Button.Content hidden>
                        <Icon name='shopping cart' />
                    </Button.Content>
                </Button>
                <Button.Or size='huge' />
                <Button animated as={Link} to='/sell' size='huge' style={MainStyle.buysellpanel}>
                    <Button.Content visible>sell</Button.Content>
                    <Button.Content hidden>
                        <Icon name='shopping bag' />
                    </Button.Content>
                </Button>
            </Button.Group>
        )
    }
}

export default BuySellPanel;