import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import About from './Views/About';
import Terms from './Views/Terms';
import Contacts from './Views/Contacts';
import Home from './Views/Home';
import User from './Views/User';
import Sell from './Views/Sell';
import Buy from './Views/Buy';
import Login from './Views/Login';
import Signup from './Views/Signup';
import RestorePassword from './Views/RestorePassword';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainStyle from '../Style/MainStyle';
import { Container } from 'semantic-ui-react';
import AuthRoute from './Navigation/AuthRoute';

class App extends Component {
  render() {
      return (
        <MuiThemeProvider>
              <div style={MainStyle.app.viewport}>
                <AppHeader />
                <div style={MainStyle.app.switchport}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <AuthRoute path='/terms' component={Terms} />
                        <AuthRoute path='/contacts' component={Contacts} />
                        <AuthRoute path='/user' component={User} />
                        <AuthRoute path='/sell' component={Sell} />
                        <AuthRoute path='/buy' component={Buy} />
                        <Route path='/about' component={About} />
                        <Route path='/restorepwd' component={RestorePassword} />
                    </Switch>
                  </div>
                <AppFooter />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
