import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import generate from 'project-name-generator';

const Apps = new Mongo.Collection('apps');

Apps.before.insert(function (userId, doc) {    
    const key = generate({
        number: true,
        words: 2
    }).dashed;
    
    doc.createdAt = Date.now();
    doc.apiKey = {
        key,
        secret: Random.hexString(32),
    };
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