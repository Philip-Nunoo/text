import React from 'react';
import Loadable from 'react-loadable';

const PageLoading = ({ 
    error, 
    retry,
    ...props
}) => {
    if (error) {
        return <div>Error! <button onClick={retry}>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

const loadingOptions = {
    loading: PageLoading,
    delay: 200, // 0.2 seconds
    timeout: 10000, // 10 seconds
}

export const AccountsPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Accounts')
});

export const AppsPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Apps')
});

export const LoginPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Login')
});

export const OverviewPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Overview')
});

export const ReportsPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Reports')
});

export const SendMessagePage = Loadable({
    ...loadingOptions,
    loader: () => import('./SendMessage')
});

export const SettingsPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Settings')
});

export const UsersPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Users')
});

export const GroupsPage = Loadable({
    ...loadingOptions,
    loader: () => import('./Groups')
});