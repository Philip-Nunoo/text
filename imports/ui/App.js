import React, { Component } from 'react'
import { 
  BrowserRouter as Router, 
  Route,
  Redirect, 
  Switch
} from 'react-router-dom'
import DashboardLayout from './layouts/Dashboard';
import {
  AppsPage,
  LoginPage,
  OverviewPage,
  ReportsPage,
  SendMessagePage,
  UsersPage,
  AccountsPage
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
const DashboardRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <DashboardLayout>
          <Component {...matchProps} />
      </DashboardLayout>
    )} />
  )
};

const LoginLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <LoginLayout>
          <Component {...matchProps} />
      </LoginLayout>
    )} />
  )
};

/*
   App
 */

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <LoginLayoutRoute path="/login" component={LoginPage} />
          <DashboardRoute path="/accounts" component={AccountsPage} />
          <DashboardRoute path="/apps" component={AppsPage} />
          <DashboardRoute path="/overview" component={OverviewPage} />
          <DashboardRoute path="/reports" component={ReportsPage} />
          <DashboardRoute path="/send-message" component={SendMessagePage} />
          <DashboardRoute path="/users" component={UsersPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;