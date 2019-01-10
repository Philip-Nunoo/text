import { Meteor } from 'meteor/meteor';
import Groups from './index.js';

Meteor.publish('groups.all', () => {
    return Groups.find();
});