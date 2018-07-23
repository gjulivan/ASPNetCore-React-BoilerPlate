import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
//import { login } from '../../Actions/userActions';

import * as ACTIONS from '../../Actions/userActions';

class Login extends Component {
  constructor(props) {
   super(props);
   this.state = {Email:'', Password: '', RememberMe: true, redirectToReferrer: false};
   this.handleSubmit = this.handleSubmit.bind(this);
   this.onEmailChange = this.onEmailChange.bind(this);
   this.onPasswordChange = this.onPasswordChange.bind(this);
   this.onRememberChange = this.onRememberChange.bind(this);
 }

 componentWillMount(){
   if(!this.props.isAuthenticated){
     this.props.validateAuth().then((res)=>{
       if(res){
         this.setState({redirectToReferrer:true, isError: false});
       }
     });
   }
 }

 onEmailChange(event){
   this.setState({Email: event.currentTarget.value});
 }

 onPasswordChange(event){
   this.setState({Password: event.currentTarget.value});
 }

 onRememberChange(event){
   this.setState({RememberMe : event.currentTarget.checked});
 }

 handleSubmit(param){
    // form is valid
    const { Email, Password, RememberMe } = this.state;
    this.props.login({ Email, Password, RememberMe }).then((res)=>{
      if(res){
        this.setState({redirectToReferrer:true, isError: false});
      } else{
        this.setState({isError: true});
      }
    });
 }

 componentDidMount(){
 }
    render() {

      const { Email, Password, RememberMe, redirectToReferrer, isError } = this.state;
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      if (redirectToReferrer) {
           return (
             <Redirect to={from}/>
           )
         }

        return (
            <div className="ui middle aligned center aligned grid">
              <div className="column" style={{maxWidth: '450px'}}>
                <h2>
                  <div className="content">
                  LOG IN
                  </div>
                </h2>
                {
                  isError && <Segment size='small' inverted color='red' tertiary>Invalid password or email</Segment>
                }
                <Form className="ui large form login">
                   <Form.Input name="Email" placeholder='Email Address' value={Email} onChange={this.onEmailChange} required/>
                   <Form.Input name='Password' placeholder='Password' type="password" value={Password} onChange={this.onPasswordChange} required/>
                    <Form.Checkbox label='remember Me?' checked={RememberMe} onChange={this.onRememberChange}/>
                    <div className="field">
                     <Link to="/restorepwd">forgot password?</Link>
                   </div>
                   <Form.Button content='Submit' color="green"  onClick={this.handleSubmit}/>
                   <div className="field">
                    <span>Don't have account?&nbsp;&nbsp;</span>
                    <Link to="/signup">sign up</Link>
                  </div>
                </Form>
              </div>
            </div>
        );
    };
}


const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.user.isAuthenticated
})

function mapDispatchToProps(dispatch) {
  return {
    login: (payload) => dispatch(ACTIONS.login(payload)),
    validateAuth: (payload) => dispatch(ACTIONS.validateAuth(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
