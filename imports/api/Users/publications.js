import { publishComposite } from 'meteor/reywood:publish-composite';
import { Roles } from 'meteor/alanning:roles';
import Users from './index';
import UserGroups from './UserGroups';
import Groups from './../Groups';

publishComposite('users.all', {
    find() {
        const fields = {
            emails: 1,
            status: 1,
            createdAt: 1
        };
        
        if (!this.userId) {
            return this.ready();
        }
        // Todo: Find users in a group by the current user
        if (Roles.userIsInRole(this.userId, 'super-admin')) {
            return Users.find({}, { fields });
        }
        
        const user = Users.findOne(this.userId, { fields: { group: 1 }});
        if (
            Roles.userIsInRole(
                this.userId, 
                UserGroups.client.roles, 
                user.group || ''
            )
        ) {
            console.log('todo: find all users in this group');
            
            return Users.find({}, { fields });
        }
        return this.ready;
    },
    children: [{
        find(user) {
            return Groups.find({});
        }
    }]
});