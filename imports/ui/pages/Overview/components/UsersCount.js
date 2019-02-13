import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CountUp from 'react-countup';
import Users from '/imports/api/Users';

const UsersCount = ({
    loading,
    users
}) => (
    loading ? 
    'loading...' : 
    <CountUp end={users.length} />
);

export default withTracker(() => {
    const handle = Meteor.subscribe("users.find", null, { _id: 1});
  
    return ({
      loading: !handle.ready(),
      users: Users.find().fetch(),
    });
})(UsersCount);
