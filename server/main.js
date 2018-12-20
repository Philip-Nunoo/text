import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles';
import Apps from '/imports/api/Apps';
import '/imports/api';
import './api/v1';

Meteor.startup(() => {
  //Create Master Admin if none exists
  if (Roles.getUsersInRole('super-admin', Roles.GLOBAL_GROUP).count() == 0) {
    const adminId = Accounts.createUser({
      username: "admin",
      email: "admin@midastech.com",
      password: "madmin",
      profile: { firstName: "Midas", lastName: "Technology" }
    });

    Roles.addUsersToRoles(adminId, 'super-admin', Roles.GLOBAL_GROUP);
  }
});
