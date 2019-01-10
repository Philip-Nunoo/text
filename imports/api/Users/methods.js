import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import UserGroups from './UserGroups';
import Users from './index';

Meteor.methods({
    'Users.addNewUser'({
        username, 
        email, 
        password, 
        fullName, 
        type,
        group
    }) {
        if(!Roles.userIsInRole(
            this.userId, 
            ['super-admin', ...UserGroups.admin.roles],
            UserGroups.admin.name
        )) {
            throw new Meteor.Error('unauthorized');
        }
        
        const options = {
            username,
            email,
            password,
            profile: {
                firstName: fullName
            }

        };

        const userId = Accounts.createUser(options);
        Roles.addUsersToRoles(userId, UserGroups[type].roles, group);
        
        return { userId };        
    },
    'Users.remove'(userId) {
        if(!Roles.userIsInRole(
            this.userId, 
            ['super-admin', ...UserGroups.admin.roles],
            UserGroups.admin.name
        )) {
            throw new Meteor.Error('unauthorized');
        }

        Users.remove(userId);
        
        return { id: userId };
    }
})

