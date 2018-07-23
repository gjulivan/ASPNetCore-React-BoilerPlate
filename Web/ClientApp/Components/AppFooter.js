import React, { Component } from 'react';
import { Grid, Header, Icon, List, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Components/Controls/Logo';
import SocialAccountsPanel from '../Components/Navigation/SocialAccountsPanel';
import FooterNavigationPanel from '../Components/Navigation/FooterNavigationPanel';

class AppFooter extends Component {
    render() {
        return (
            <div style={{ background: '#333', height: '10pv' }}>
                <Grid columns='equal' padded verticalAlign='middle' textAlign='center'>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <FooterNavigationPanel/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Logo />
                            <p style={{ color: '#fff' }}>2018</p>
                        </Grid.Column>
                        <Grid.Column>
                            <SocialAccountsPanel/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default AppFooter;