import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CountUp from 'react-countup';
import SmsRequests from '/imports/api/SmsRequests';

const ReportsCount = ({
    loading,
    reports,
}) => (
    loading ? 
    'loading...' : 
    <CountUp end={reports.length} />
);

export default withTracker(() => {
    const handle = Meteor.subscribe("smsRequests.find", null, { _id: 1 });
  
    return ({
      loading: !handle.ready(),
      reports: SmsRequests.find().fetch()
    });
})(ReportsCount);
