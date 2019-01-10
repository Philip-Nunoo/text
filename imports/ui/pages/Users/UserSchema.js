import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        label: 'Email Address',
        uniforms: {
            type: 'email'
        }
    },
    password: {
        type: String,
        uniforms: {
            type: 'password'
        }
    },
    confirmPassword: {
        type: String,
        uniforms: {
            type: 'password'
        }
    },
    type: {
        type: String,
        allowedValues: ['user', 'client', 'admin'],
        uniforms: {
            options: [
                { label: 'User', value: 'user' },
                { label: 'Client', value: 'client' },
                { label: 'Admin', value: 'admin' }
            ]
        }
    },
    group: {
        type: String
    }
});