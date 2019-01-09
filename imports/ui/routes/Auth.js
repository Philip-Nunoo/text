import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import AuthLayout from './../layouts/Auth';

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
            return !authenticated ?
            <AuthLayout>
                <Component {...matchProps} />
            </AuthLayout> :
            <Redirect to="/overview" />
        }}
    />
)
