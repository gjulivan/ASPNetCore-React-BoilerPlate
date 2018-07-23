import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainStyle from '../../Style/MainStyle';

class Logo extends Component {
    render() {
        return (
			<Header size='large' style={MainStyle.logo} as={Link} to='/'>
				<Icon name="bug" />
				MacBeans
			</Header>
        )
    }
}

export default Logo;