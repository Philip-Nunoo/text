//@flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/api/Users';
import {
  Breadcrumb,
  Button,
  Portlet,
  Table
} from './../../components';
import NewUserModal from './NewUserModal';


export class UsersPage extends Component {
  state = {
    showNewUserModal: false
  };

  toggleNewUserModal = () => {
    this.setState({
      showNewUserModal: !this.state.showNewUserModal
    });
  }

  submitNewUserForm = doc => {
    Meteor.call('Users.addNewUser', doc, (error) => {
      if (error) {
        console.error(error);
      } else {
        this.toggleNewUserModal();
      }
    });
  }  

  render() {
    const { users = [] } = this.props;
    const { showNewUserModal } = this.state;

    return (
      <div>
        <Breadcrumb
          title="Users"
          toolbar={
            <Button
              color="primary"
              size="sm"
              onClick={this.toggleNewUserModal}
            >
              Add User
            </Button>
          }
        />
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
                      <Button
                        color="primary"
                        size="sm"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Portlet.Body>
        </Portlet>
        <NewUserModal
          isOpen={showNewUserModal} 
          toggle={this.toggleNewUserModal}
          onSubmit={this.submitNewUserForm}
        />
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    users: Users.find().fetch(),
  };
})(UsersPage);
