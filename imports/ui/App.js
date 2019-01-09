// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { 
  BrowserRouter as Router, 
  Route,
  Redirect, 
  Switch
} from 'react-router-dom';
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
import {
  AuthRoute,
  ProtectedRoute
} from './routes';
import './styles/index.css';

const App = props => (
  <Router>
    <Switch>
      <Route exact path="/">
          <Redirect to="/login" />
      </Route>
      <AuthRoute path="/login" component={LoginPage} {...props} />
      <ProtectedRoute path="/accounts" component={AccountsPage} {...props} />
      <ProtectedRoute path="/apps" component={AppsPage} {...props} />
      <ProtectedRoute path="/overview" component={OverviewPage} {...props} />
      <ProtectedRoute path="/reports" component={ReportsPage} {...props} />
      <ProtectedRoute path="/send-message" component={SendMessagePage} {...props} />
      <ProtectedRoute path="/settings" component={SettingsPage} {...props} />
      <ProtectedRoute path="/users" component={UsersPage} {...props} />
      <Route path="*" component={() => <div>Not found</div>} />
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