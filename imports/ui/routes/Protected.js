import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import DashboardLayout from './../layouts/Dashboard';

export default ({ 
    loggingIn, 
    authenticated, 
    component: Component, 
    ...rest
}) => (
    <Route 
        {...rest} 
        render={matchProps => {
            if (loggingIn) return <div>Loading...</div>;
            return authenticated ? 
            <DashboardLayout>
                <Component {...matchProps} />
            </DashboardLayout> :
            <Redirect to='/login' />
        }}
    />
);
