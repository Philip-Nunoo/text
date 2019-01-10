import { Mongo } from 'meteor/mongo';

const Groups = new Mongo.Collection('groups');

Groups.before.insert(function (userId, doc) {    
    doc.createdAt = Date.now();
});

Groups.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = Date.now();
});

export default Groups;