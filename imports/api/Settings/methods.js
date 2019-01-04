import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Settings from './index';

Meteor.methods({
    'Setting.update'(appDoc) {
        if (!Roles.userIsInRole(
            this.userId, 
            ['super-admin', 'create-app']
        )) {
            throw new Meteor.Error('unauthorized');
        }

        const doc = {
            ...appDoc,
            client: 'txt-ghana',
            active: true
        };

        const id = Settings.upsert({
            client: 'txt-ghana',
            active: true
        }, {
            $set: doc
        });
        return { id };
    }
})