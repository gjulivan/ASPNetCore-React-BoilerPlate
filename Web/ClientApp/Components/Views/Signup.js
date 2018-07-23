import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../Actions/userActions';

class Signup extends Component {
  constructor(props) {
   super(props);
   this.state = {Email:'', Password: '', ConfirmPassword: '', redirectToReferrer: false};
   this.handleSubmit = this.handleSubmit.bind(this);
   this.onEmailChange = this.onEmailChange.bind(this);
   this.onPasswordChange = this.onPasswordChange.bind(this);
   this.onRePasswordChange = this.onRePasswordChange.bind(this);
   this.validateData = this.validateData.bind(this);
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

 onRePasswordChange(event){
   this.setState({ConfirmPassword : event.currentTarget.value});
 }

 validateData(){
     const { Email, Password, ConfirmPassword } = this.state;
     if(ACTIONS.validateEmail(Email)){
       if(Password === ConfirmPassword){
         if(ACTIONS.validatePasswordStrength(Password)){
           return true;
         } else {
           this.setState({ErrorMessage: 'Password must contain 1 Uppercase, 1 Digit, 1 Symbols, and at least 6 characters'});
         }
       } else {
         this.setState({ErrorMessage: 'Password not match'});
       }
     } else {
       this.setState({ErrorMessage: 'Please enter a valid email address'});
     }

     return false;
 }

 handleSubmit(param){
    // form is valid
    const { Email, Password, ConfirmPassword } = this.state;
    if(this.validateData()){
      this.props.register({ Email, Password, ConfirmPassword }).then((res)=>{
        if(res){
          if(res.errorMessage){
              this.setState({isError: true, ErrorMessage: res.errorMessage});
          } else {
            this.setState({redirectToReferrer:true, isError: false});  
          }
        } else{
          this.setState({isError: true});
        }
      });
    } else {
      this.setState({isError: true});
    }

 }

 componentDidMount(){
 }
    render() {

      const { Email, Password, ConfirmPassword, redirectToReferrer, isError, ErrorMessage } = this.state;
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
                  REGISTRATION
                  </div>
                </h2>
                {
                  isError && <Segment size='small' inverted color='red' tertiary>{ErrorMessage}</Segment>
                }
                <Form className="ui large form login">
                   <Form.Input name="Email" placeholder='Email Address' value={Email} onChange={this.onEmailChange} required/>
                   <Form.Input name='Password' placeholder='Password' type="password" value={Password} onChange={this.onPasswordChange} required/>
                   <Form.Input name='Password' placeholder='Repeat Password' type="password" value={ConfirmPassword} onChange={this.onRePasswordChange} required/>

                   <Form.Button content='SIGN UP' color="green"  onClick={this.handleSubmit}/>
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
    register: (payload) => dispatch(ACTIONS.register(payload)),
    validateAuth: (payload) => dispatch(ACTIONS.validateAuth(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
