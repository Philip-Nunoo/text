import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CountUp from 'react-countup';
import ClientApps from '/imports/api/Apps';

const AppsCount = ({
    loading,
    apps,
}) => (
    loading ? 
    'loading...' : 
    <CountUp end={apps.length} />
);

export default withTracker(() => {
    const handle = Meteor.subscribe("apps.find", null, { _id: 1 });
  
    return ({
      loading: !handle.ready(),
      apps: ClientApps.find().fetch(),
    });
})(AppsCount);
