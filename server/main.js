import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import Apps from '/imports/api/Apps';
import './api/v1';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

function insertApp(name, apiKey = {}) {
  Apps.insert({ name, apiKeys: [{ ...apiKey }] });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Apps.find().count() === 0) {
    insertApp('4gcapital', { secret: 'api-secret', key: 'api-key' })
  }

  //Create Master Admin if none exists
  if (Roles.getUsersInRole('super-admin', Roles.GLOBAL_GROUP).count() == 0) {
    console.log('nothing');
    
    const adminId = Accounts.createUser({
      username: "admin",
      email: "admin@midastech.com",
      password: "madmin",
      profile: { firstName: "Midas", lastName: "Technology" }
    });

    Roles.addUsersToRoles(adminId, 'super-admin', Roles.GLOBAL_GROUP);
  }

  // if (Links.find().count() === 0) {
  //   insertLink(
  //     'Do the Tutorial',
  //     'https://www.meteor.com/tutorials/react/creating-an-app'
  //   );

  //   insertLink(
  //     'Follow the Guide',
  //     'http://guide.meteor.com'
  //   );

  //   insertLink(
  //     'Read the Docs',
  //     'https://docs.meteor.com'
  //   );

  //   insertLink(
  //     'Discussions',
  //     'https://forums.meteor.com'
  //   );
  // }
});
