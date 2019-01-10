import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {
    Route,
    Redirect
} from 'react-router-dom';
import DashboardLayout from './../layouts/Dashboard';

export default ({ 
    loggingIn, 
    authenticated, 
    component: Component, 
    role = [],
    ...rest
}) => (
    <Route 
        {...rest} 
        render={matchProps => {
            if (loggingIn) return <div>Loading...</div>;
            if (!
                Roles.userIsInRole(
                    Meteor.userId(),
                    ['super-admin', ...role]
                )
            ) {
                return <Redirect to="/not-found" />
            }
            return authenticated ? 
            <DashboardLayout>
                <Component {...matchProps} />
            </DashboardLayout> :
            <Redirect to='/login' />
        }}
    />
);
