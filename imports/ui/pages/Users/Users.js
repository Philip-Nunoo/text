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
} from './../../components';import NewUserModal from './NewUserModal';
import TableRow from './TableRow';
export class UsersPage extends Component {
  static defaultProps = {
    isAdmin: false,
    users: [],
    loading: true
  }

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

  removeUser = userId => {
    Meteor.call('Users.remove', userId, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('user removed');
      }
    });
  }

  render() {
    const {
      isAdmin,
      loading,
      users
    } = this.props;
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
            {loading ?
            <div>Loading...</div> :
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
                {users.map(user => (
                  <TableRow 
                    key={user._id} 
                    user={user} 
                    removeUser={this.removeUser} 
                    loggedInUser={this.props.user}
                  />
                ))}
              </tbody>
            </Table>
            }
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
  const handle = Meteor.subscribe("users.all");

  return {
    user: Meteor.user(),
    loading: !handle.ready(),
    users: Users.find().fetch(),
  };
})(UsersPage);
