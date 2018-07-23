import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { validateAuth } from '../../Actions';

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(AuthRoute);
