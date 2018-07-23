import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

class RestorePassword extends Component {
  constructor(props) {
   super(props);
   this.state = {Email:'', Password: '', RememberMe: false, redirectToReferrer: false};
   this.handleSubmit = this.handleSubmit.bind(this);
   this.onEmailChange = this.onEmailChange.bind(this);
 }

 onEmailChange(event){
   this.setState({Email: event.currentTarget.value});
 }

 handleSubmit(param){
 }
    render() {

      const { Email, Password, RememberMe, redirectToReferrer } = this.state;
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
                  RESTORE PASSWORD
                  </div>
                </h2>
                <Form className="ui large form login">
                   <Form.Input name="Email" placeholder='Email Address' value={Email} onChange={this.onEmailChange} required/>
                   <Form.Button color="green"  onClick={this.handleSubmit}>SEND LINK</Form.Button>
                </Form>
              </div>
            </div>
        );
    };
}

export default RestorePassword;
