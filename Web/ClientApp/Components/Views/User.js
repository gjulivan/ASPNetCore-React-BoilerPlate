import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import UserMainPanel from '../User/UserMainPanel';
import { connect } from 'react-redux';
import MainStyle from '../../Style/MainStyle';

class User extends Component {

    render() {
        return (
            <div style={MainStyle.user}>
                <Grid stackable stretched textAlign='center' columns={3}>
                    <UserTopPanel />
                    <Grid.Row>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                </Grid>
            </div>
   
        );
    };
}

function mapStateToProps(state) {
    return {
        user: state.user,
        wallets: state.wallets,
    };
}

export default connect(mapStateToProps)(User);