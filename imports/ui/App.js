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
  GroupsPage,
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
import {
  admin,
  client,
  user
} from './../api/Users/UserGroups';
import { SidebarMenus } from './config';
import './styles/index.css';

const App = props => (
  <Router>
    <Switch>
      <Route exact path="/">
          <Redirect to="/login" />
      </Route>
      <AuthRoute
        path="/login"
        component={LoginPage}
        {...props}
      />
      {SidebarMenus.map(({ 
        url, 
        ...menu 
      }) => {             
        return (
          <ProtectedRoute
            key={url}
            path={url}
            {...menu}
            {...props}
          />
        );
      })}
      {/* <ProtectedRoute
        path="/accounts"
        component={AccountsPage}
        roles={user.roles}
        {...props}
      />
      <ProtectedRoute
        path="/apps"
        component={AppsPage}
        roles={user.roles}
        {...props}
      />
      <ProtectedRoute
        path="/overview"
        component={OverviewPage}
        roles={user.roles}
        {...props}
      />
      <ProtectedRoute
        path="/reports"
        component={ReportsPage}
        roles={user.roles}
        {...props}
      />
      <ProtectedRoute
        path="/send-message"
        component={SendMessagePage}
        roles={admin.roles}
        {...props}
      />
      <ProtectedRoute
        path="/settings"
        component={SettingsPage}
        roles={admin.roles}
        {...props}
      />
      <ProtectedRoute
        path="/users"
        component={UsersPage}
        roles={client.roles}
        {...props}
      />
      <ProtectedRoute
        path="/groups"
        component={GroupsPage}
        roles={admin.roles}
        {...props}
      /> */}
      <Route 
        path="/not-found"
        component={() => <div>Not found</div>} 
      />
      <Route path="*">
        <Redirect to="/not-found" />
      </Route>
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
  Meteor.subscribe('userData');

  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
    user: Meteor.user(),
  });
};

export default compose(getTrackerLoader(composer))(App);