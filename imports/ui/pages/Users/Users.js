//@flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
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

    const renderDate = date => (
      moment(date).format('DD MMM YYYY hh:mm:ss')
    );

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
                {users.map(({ profile = {}, ...user}) => (
                  <tr key={user._id}>
                    <td/>
                    <td>{`${profile.firstName} ${profile.lastName}`}</td>
                    <td>{user.emails[0].address}</td>
                    <td>{user.createdAt && renderDate(user.createdAt)}</td>
                    <td>{user.status.lastLogin && renderDate(user.status.lastLogin.date)}</td>
                    <td>
                      {isAdmin && 
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => this.removeUser(user._id)}
                      >
                        <i className="icon-bin"/>
                      </Button>}
                    </td>
                  </tr>
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
