import { Mongo } from 'meteor/mongo';

const SmsRequests = new Mongo.Collection('sms-requests');

SmsRequests.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.status = 'new';
});

SmsRequests.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = Date.now();
});

SmsRequests.after.insert(function (userId, doc) {
    console.log('send sms message to', doc.to);
});

export default SmsRequests;