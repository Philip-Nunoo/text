// @flow
import React from 'react';
import moment from 'moment';
// import reportsJson from './report_example';
import {
  Breadcrumb,
  Button,
  Label,
  Table
} from './../../components';

const Reports = ({ reports = [] }) => {
  const renderStatus = status => {
    let state = <Label>Not found</Label>;
    switch (status) {
      case 'pending': {
        state = <Label color="info">Pending</Label>;
        break;
      }
      case 'scheduled': {
        state = <Label color="secondary">Scheduled</Label>;
        break;
      }
      case 'sent': {
        state = <Label color="success">Sent</Label>;
        break;
      }
      default:
        break;
    }
    return state;
  }

  const renderDate = date => (
    moment(date).format('DD MMM YYYY hh:mm:ss')
  );
  
  return (
    <div>
      <Breadcrumb title="Reports" />
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
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{renderDate(report.createdAt)}</td>
              <td>{report.origin}</td>
              <td>{report.destination}</td>
              <td>{report.message}</td>
              <td>{renderStatus(report.status)}</td>
              <td>
                <Button color="primary" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Reports
