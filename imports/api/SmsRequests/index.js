import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

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
    
    if (doc.to) {
        var request = require("request");

        var options = {
            method: 'POST',
            url: 'https://www.txtconnect.co/v2/app/api/send/sms.json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                token: 'ffd452df80dd8b78154bc886b9ee03593202c1fc',
                message: doc.message,
                sender: 'TSF - Test',
                recipients: doc.to
            }
        };

        HTTP.call(options.method, options.url, {
            headers: options.headers,
            params: options.form
        }, (error, result) => {
            if (error) { console.error(error); }
            else {
                if (result.data.resp_code === 'successful') {
                    SmsRequests.update({
                        _id: doc._id
                    }, {
                        $set: {
                            status: 'scheduled',
                            transactionId: result.data.transaction_id
                        }
                    });                
                }
            }
        });
    }
});

export default SmsRequests;