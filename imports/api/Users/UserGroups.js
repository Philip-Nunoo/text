export default {
    admin: {
        roles: [
            'create-user', 
            'update-user',
            'delete-user',
            'create-app',
            'update-app',
            'delete-app',
            'update-report',
            'delete-report'
        ]
    },
    client: {
        roles: [
            'delete-user',
            'create-app',
            'update-app'
        ]
    },
    user: {
        roles: []
    }
}