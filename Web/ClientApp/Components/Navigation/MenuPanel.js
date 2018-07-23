import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainStyle from '../../Style/MainStyle';
import { connect } from 'react-redux';
import * as ACTIONS from '../../Actions/userActions';

class MenuPanel extends Component {
  constructor(props) {
   super(props);
   this.onLogout = this.onLogout.bind(this);
 }

 onLogout(){
   this.props.logout();
 }
    render() {
      const { user, isAuthenticated } = this.props;
      if(isAuthenticated){
        return (
          <Dropdown item text={user && user.maininfo ? user.maininfo.username : ""} style={MainStyle.menupanel}>
                <Dropdown.Menu>
                    <Dropdown.Item to='/user' as={Link}>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item to='/about' as={Link}>About</Dropdown.Item>
                    <Dropdown.Item to='/terms' as={Link}>Terms</Dropdown.Item>
                    <Dropdown.Item to='/contacts' as={Link}>Contacts</Dropdown.Item>
                    <Dropdown.Item onClick={this.onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        )
      } else {
        return (<div>
          <Button as={Link} to='/signup' size='large' style={MainStyle.buysellpanel}>sign up</Button>
          <Button as={Link} to='/Login' size='large' style={MainStyle.buysellpanel}>login</Button>
        </div>)
      }

    }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user
})

function mapDispatchToProps(dispatch) {
  return {
    logout: (payload) => dispatch(ACTIONS.logout(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel);
//export default MenuPanel;
