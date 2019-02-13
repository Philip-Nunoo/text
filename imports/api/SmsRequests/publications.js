import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SmsRequests from './index';
import Apps from './../Apps';

publishComposite('smsRequests.find', {
    find(
        query = {},
        fields = { _id: 1},
    ) {
        if (this.userId) {
            return SmsRequests.find(query, { fields });
        }
    }
});

publishComposite('smsRequests.all', {
    find() {
        const loggedInUser = Meteor.user();
        
        if(
            !Roles.userIsInRole(
                loggedInUser._id,
                ['super-admin', 'view-reports'],
                loggedInUser.groupId
            )
        ) {
            return this.ready();
        }
        
        if (Roles.userIsInRole(loggedInUser._id, ['super-admin'])) {
            return Apps.find();
        }
        return Apps.find()
    },
    children: [
        {
            find({ _id: appId }) {
                return SmsRequests.find({ appId });
            }
        }
    ]
});