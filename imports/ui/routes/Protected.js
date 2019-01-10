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
    roles = [],
    ...rest
}) => (
    <Route 
        {...rest} 
        render={matchProps => {
            if (loggingIn) return <div>Loading...</div>;         
            
            if (
                !Roles.userIsInRole(
                    Meteor.userId(),
                    ['super-admin', ...roles],
                    rest.user.groupId
                )
            ) {
                return <Redirect to="/not-found" />
            }
            return authenticated ? 
            <DashboardLayout
                loggingIn={loggingIn} 
                authenticated={authenticated}
                roles={roles}
                {...rest}
            >
                <Component {...matchProps} />
            </DashboardLayout> :
            <Redirect to='/login' />
        }}
    />
);
