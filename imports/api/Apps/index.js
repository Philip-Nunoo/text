import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

const Apps = new Mongo.Collection('apps');

Apps.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.apiKey = Random.hexString(32);
    doc.assignedTo = doc.assignedTo ? doc.assignedTo : userId;
    doc.status = 'new';
});

Apps.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = Date.now();
});

Apps.after.insert(function (userId, doc) {
    console.log('send sms message to', doc.to);
});

export default Apps;