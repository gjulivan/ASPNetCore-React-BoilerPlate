import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class FooterNavigationPanel extends Component {
    render() {
        return (
            <div>
                <List link inverted>
                    <List.Item as={Link} to='/about'>about</List.Item>
                    <List.Item as={Link} to='/terms'>terms</List.Item>
                    <List.Item as={Link} to='/contacts'>contacts</List.Item>
                </List>
            </div>
        )
    }
}

export default FooterNavigationPanel;