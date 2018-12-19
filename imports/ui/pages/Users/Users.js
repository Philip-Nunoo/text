//@flow
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Breadcrumb,
  Button,
  Portlet,
  Table
} from './../../components';
import Users from '/imports/api/Users';

const UsersPage = ({ users = [] }) => {
  return (
    <div>
      <Breadcrumb title="Users" />
      <Portlet>
        <Portlet.Body>
          <Table>
            <thead>
              <tr>
                <th/>
                <th>Full name</th>
                <th>Email</th>
                <th>Created at</th>
                <th>Last login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ profile = {}, ...user}) => (
                <tr key={user._id}>
                  <td/>
                  <td>{`${profile.firstName} ${profile.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt && user.createdAt.toString()}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <Button color="primary" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Portlet.Body>
      </Portlet>
    </div>
  )
}

export default UsersContainer = withTracker(() => {
  return {
    users: Users.find().fetch(),
  };
})(UsersPage);
