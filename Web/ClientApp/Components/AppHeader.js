import React, { Component } from 'react';
import { Icon, Dropdown, Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BuySellPanel from '../Components/Navigation/BuySellPanel';
import MenuPanel from '../Components/Navigation/MenuPanel';
import Logo from '../Components/Controls/Logo';

class AppHeader extends Component {
    
    render() {

        return (
            <div style={{ background: '#333', height: '10pv' }}>
                <Grid columns='equal' padded verticalAlign='middle' textAlign='center'>
                    <Grid.Column>
                        <Logo/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <BuySellPanel/>
                    </Grid.Column>
                    <Grid.Column>
                        <MenuPanel/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default AppHeader;