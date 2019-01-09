// @flow
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SmsRequests from '/imports/api/SmsRequests';
import {
  Breadcrumb,
  Portlet,
  Table
} from './../../components';
import TableRow from './TableRow';

const Reports = ({ reports = [], loading = true, ...props }) => {  

  const remove = (reportId) => {

  }
  
  return (
    <div>
      <Breadcrumb title="Reports" />
      <Portlet>
        <Portlet.Body>
          {loading ?
          <div>Loading...</div> :
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => 
                <TableRow 
                  key={report._id} 
                  report={report} 
                  removeReport={remove}
                  {...props}
                />
              )}
            </tbody>
          </Table>
          }
        </Portlet.Body>
      </Portlet>
    </div>
  )
}

export default ReportsContainer = withTracker(() => {
  const handle = Meteor.subscribe("smsRequests.all");

  return {
    loading: !handle.ready(),
    reports: SmsRequests.find().fetch(),
  };
})(Reports);
