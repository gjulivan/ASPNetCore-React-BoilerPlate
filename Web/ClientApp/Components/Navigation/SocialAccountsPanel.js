import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class SocialAccountsPanel extends Component {
    render() {
        return (
            <div>
                <a href='mailto:grandjulivan@gmail.com'>
                    <Icon link circular inverted color='red' name='mail outline' />
                </a>
                <a href='https://twitter.com/pensiil' target='_blank'>
                    <Icon link circular inverted color='blue' name='twitter' />
                </a>
                <a href='#' target='_blank'>
                    <Icon link circular inverted color='blue' name='facebook' />
                </a>
                <a href='#' target='_blank'>
                    <Icon link circular inverted color='blue' name='linkedin' />
                </a>
                <a href='https://t.me/gjulivan' target='_blank'>
                    <Icon link circular inverted color='blue' name='telegram' />
                </a>
            </div>
        )
    }
}

export default SocialAccountsPanel;