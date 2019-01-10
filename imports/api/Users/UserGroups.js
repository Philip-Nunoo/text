export const user = {
    name: 'user',
    roles: [
        // apps
        'view-apps',
        // reports
        'view-reports',
    ]
};

export const client = {
    name: 'client',
    roles: [
        ...user.roles,
        'view-users'
    ]
};

export const groupAdmin = {
    name: 'group-admin',
    roles: [
        ...client.roles,
        // app
        'create-app',
        'delete-app',
        // reports
        'delete-report',
        // user
        'create-user',
        'delete-user',
        'update-user'
    ]
};

export const admin = {
    name: 'admin',
    roles: [
        ...groupAdmin.roles,
        // groups
        'view-groups',
        'create-group',
        'update-group',
        'delete-group',        
        // settings
        'view-settings',
        'update-setting',
    ]
};