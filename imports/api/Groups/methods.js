import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Groups from './index';

Meteor.methods({
    'Group.create'(groupDoc) {
        if (!Roles.userIsInRole(
            this.userId, 
            ['super-admin', 'create-group']
        )) {
            throw new Meteor.Error('unauthorized');
        }

        const id = Groups.insert(groupDoc);
        return { id };
    },
    'Group.remove'(groupId) {
        if (!Roles.userIsInRole(
            this.userId, 
            ['super-admin', 'create-group']
        )) {
            throw new Meteor.Error('unauthorized');
        }

        Groups.remove(groupId);
        return { groupId };
    }
})