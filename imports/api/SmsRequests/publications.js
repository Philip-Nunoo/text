import { Meteor } from 'meteor/meteor';
import SmsRequests from './index';

Meteor.publish('smsRequests.all', () => {
    return SmsRequests.find();
});