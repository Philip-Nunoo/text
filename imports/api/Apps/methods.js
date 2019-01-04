import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import UserGroups from './../Users/UserGroups';
import Apps from './index';

Meteor.methods({
    'App.create'(appDoc) {
        if (!Roles.userIsInRole(
            this.userId, 
            ['super-admin', 'create-app']
        )) {
            throw new Meteor.Error('unauthorized');
        }

        const id = Apps.insert(appDoc);
        return { id };
    },
    'App.remove'(appId) {
        if (!Roles.userIsInRole(
            this.userId, 
            ['super-admin', 'create-app']
        )) {
            throw new Meteor.Error('unauthorized');
        }

        Apps.remove(appId);
        return { appId };
    }
})