import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import connectRoute from 'connect-route';
import bodyParser from 'body-parser';
import SmsRequests from '/imports/api/SmsRequests';
import ApiUtility from './../ApiUtitlity';
import Config from './config';

const app = WebApp.connectHandlers;
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use((req, res, next) => {
    console.log('New request accepted: ', new Date());
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    next();
});

app.use(Meteor.bindEnvironment(connectRoute((router) => {
    router.get(`${Config.SMS}/single`, (req, res) => {
        const apiKey = req.headers['x-api-key'];
        const apiSecret = req.headers['x-api-secret'];
        
        const validApp = ApiUtility.authentication(apiKey, apiSecret);
        
        let response = {
            error: 401,
            message: "Invalid API key."
        };

        if (validApp) {
            const { to, message } = req.body;
            const smsRequestId = SmsRequests.insert({
                to,
                message,
                origin: validApp,
                status: 'new'
            })
            response = {
                referenceId: smsRequestId,
                message: 'Message successfully received.',
                status: 'pending'
            };
        }

        const prettyResponse = JSON.stringify({ response }, null, 2)
        res.end(prettyResponse);
    });
})));