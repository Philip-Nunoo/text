import { Mongo } from 'meteor/mongo';

const Settings = new Mongo.Collection('settings');

Settings.before.insert(function (userId, doc) {    
    doc.createdAt = Date.now();
    doc.createdBy = userId;
});

Settings.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = Date.now();
    modifier.$set.modifiedBy = userId;
});

Settings.after.insert(function (userId, doc) {
    console.log('send sms message to', doc.to);
});

export default Settings;