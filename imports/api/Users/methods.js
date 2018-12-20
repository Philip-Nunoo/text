import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import UserGroups from './UserGroups';

Meteor.methods({
    'Users.addNewUser'({
        username, 
        email, 
        password, 
        fullName, 
        group,
        ...userDoc
    }) {
        if(!Roles.userIsInRole(this.userId, 'super-admin', 'admin')) {
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
        Roles.addUsersToRoles(userId, UserGroups[group], group);
        
        return { userId };
        
    }
})

