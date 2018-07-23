import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainStyle from '../../Style/MainStyle';
import { Grid } from 'semantic-ui-react';
import OffersGrid from '../Offer/OffersGrid';
import Test from '../Offer/Test';

class Buy extends Component {
    render() {
        return (
            <div style={MainStyle.buy}>
                
                <Test />

                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        buy: state.buy,
    };
}
export default connect(mapStateToProps)(Buy);