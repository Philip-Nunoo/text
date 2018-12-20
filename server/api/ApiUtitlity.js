import Apps from '/imports/api/Apps';

export default {
    authentication: function (apiKey, apiSecret) {
        const app = Apps.findOne({
            apiKey: {
                key: apiKey,
                secret: apiSecret
            }
        }, { fields: { "_id": 1 }});
        console.log('app', app);
        
        if (app) {
            return app._id;
        } else {
            return false;
        }
    }
}