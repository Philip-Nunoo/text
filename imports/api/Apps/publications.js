import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import Apps from './index.js';

publishComposite('apps.find', {
    find(
        query = {},
        fields = {},
    )  {
        if (this.userId) {
            return Apps.find(query, { fields });
        }
    }
});

publishComposite('apps.all', {
    find()  {
        if (this.userId) {
            return Apps.find();
        }
    }
});
