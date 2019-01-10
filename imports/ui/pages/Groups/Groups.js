//@flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/api/Users';
import Groups from '/imports/api/Groups';
import {
  Breadcrumb,
  Button,
  Portlet,
  Table
} from './../../components';
import NewGroupModal from './NewGroupModal';
import TableRow from './TableRow';

export class GroupsPage extends Component {
  static defaultProps = {
    isAdmin: false,
    users: [],
    loading: true,
    groups: []
  }

  state = {
    showNewGroupModal: false
  };

  toggleNewGroupModal = () => {
    this.setState({
      showNewGroupModal: !this.state.showNewGroupModal
    });
  }

  submitNewGroupForm = doc => {
    Meteor.call('Group.create', doc, (error) => {
      if (error) {
        console.error(error);
      } else {
        this.toggleNewGroupModal();
      }
    });
  }  

  removeGroup = groupId => {
    Meteor.call('Group.remove', groupId, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('group removed');
      }
    });
  }

  render() {
    const {
      loading,
      groups
    } = this.props;
    const { showNewGroupModal } = this.state;

    return (
      <>
        <Breadcrumb
          title="Groups"
          toolbar={
            <Button
              color="primary"
              size="sm"
              onClick={this.toggleNewGroupModal}
            >
              Add Group
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
                  <th>Name</th>
                  <th>Created at</th>
                  <th>active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => (
                  <TableRow 
                    {...this.props}
                    key={group._id} 
                    group={group} 
                    removeGroup={this.removeGroup} 
                    loggedInUser={this.props.user}
                  />
                ))}
              </tbody>
            </Table>
            }
          </Portlet.Body>
        </Portlet>
        <NewGroupModal
          isOpen={showNewGroupModal} 
          toggle={this.toggleNewGroupModal}
          onSubmit={this.submitNewGroupForm}
          groups={this.props.groups}
        />
      </>
    )
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("groups.all");

  return {
    user: Meteor.user(),
    loading: !handle.ready(),
    users: Users.find().fetch(),
    groups: Groups.find().fetch()
  };
})(GroupsPage);
