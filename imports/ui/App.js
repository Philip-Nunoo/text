// @flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { 
  BrowserRouter as Router, 
  Route,
  Redirect, 
  Switch
} from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';
import { compose } from 'react-komposer';
import {
  AccountsPage,
  AppsPage,
  LoginPage,
  OverviewPage,
  ReportsPage,
  SendMessagePage,
  SettingsPage,
  UsersPage
} from './pages';
import './styles/index.css';

/*
  Layouts, inline define here for demo purpose
  you may want to define in another file instead
 */

const LoginLayout = ({children, ...rest}) => {
  return (
    <div className="page page-login">
      <div className="main">{children}</div>
    </div>
  )
}

/*
  Route wrapper
 */
const DashboardRoute = ({ 
  loggingIn, 
  authenticated, 
  component: Component, 
  ...rest
}) => {
  return (
    <Route 
      {...rest} 
      render={matchProps => {
        if (loggingIn) return <div>Loading...</div>;
        return authenticated ? 
          <DashboardLayout>
              <Component {...matchProps} />
          </DashboardLayout> :
          <Redirect to='/login' />
        }
      }
    />
  )
};

const LoginLayoutRoute = ({
  loggingIn,
  authenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route 
      {...rest} 
      render={matchProps => {
        if (loggingIn) return <div>Loading...</div>;
        return !authenticated ?
          <LoginLayout>
              <Component {...matchProps} />
          </LoginLayout> :
          <Redirect to="/overview" />
        }
      }
    />
  )
};

/*
   App
 */


const App = props => (
  <Router>
    <Switch>
      <Route exact path="/">
          <Redirect to="/login" />
      </Route>
      <LoginLayoutRoute path="/login" component={LoginPage} {...props} />
      <DashboardRoute path="/accounts" component={AccountsPage} {...props} />
      <DashboardRoute path="/apps" component={AppsPage} {...props} />
      <DashboardRoute path="/overview" component={OverviewPage} {...props} />
      <DashboardRoute path="/reports" component={ReportsPage} {...props} />
      <DashboardRoute path="/send-message" component={SendMessagePage} {...props} />
      <DashboardRoute path="/settings" component={SettingsPage} {...props} />
      <DashboardRoute path="/users" component={UsersPage} {...props} />
    </Switch>
  </Router>
);

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default compose(getTrackerLoader(composer))(App);