// @flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ClientApps from '/imports/api/Apps';
import {
  Breadcrumb,
  Button,
  Portlet,
  Table
} from './../../components';
import NewAppModal from './NewAppModal';

export class Apps extends Component {
  state = {
    showNewAppModal: false
  }

  toggleNewAppModal = () => {
    this.setState({
      showNewAppModal: !this.state.showNewAppModal
    });
  }

  submitNewAppForm = doc => {
    Meteor.call('App.create', doc, error => {
      if (error) {
        console.error(error);
      } else {
        this.toggleNewAppModal();
      }
    })
  }
  
  render() {
    const { apps = [] } = this.props;
    const { showNewAppModal } = this.state;

    return (
      <div>
        <Breadcrumb
          title="Apps"
          toolbar={
            <Button
              color="primary"
              size="sm"
              onClick={this.toggleNewAppModal}
            >
              Add App
            </Button>
          }
        />
        <Portlet>
          <Portlet.Body>
            <Table>
              <thead>
                <tr>
                  <th/>
                  <th>Name</th>
                  <th>ApiKey</th>
                  <th>Assigned User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app._id}>
                    <td/>
                    <td>{app.name}</td>
                    <td>{app.apiKey || 'No api key set'}</td>
                    <td>{app.assignedUser}</td>
                    <td><Button color="primary">View</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Portlet.Body>
        </Portlet>
        <NewAppModal
          isOpen={showNewAppModal} 
          toggle={this.toggleNewAppModal}
          onSubmit={this.submitNewAppForm}
        />
      </div>
    );
  }
}

export default withTracker(() => ({
  apps: ClientApps.find().fetch()
}))(Apps);
