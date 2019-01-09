import { Meteor } from 'meteor/meteor';
import Apps from './index.js';

Meteor.publish('apps.all', () => {
    return Apps.find();
});