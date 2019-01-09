import { Meteor } from 'meteor/meteor';
import Users from './index';

Meteor.publish('users.all', () => {
    const fields = {
        emails: 1,
        status: 1,
        createdAt: 1
    };

    return Users.find({}, { fields });
})