import { Meteor } from 'meteor/meteor';
import Settings from './index';

Meteor.publish('settings.all', () => {
    return Settings.find();
});
