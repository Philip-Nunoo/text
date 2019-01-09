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
import TableRow from './TableRow';
export class Apps extends Component {
  static defaultProps = {
    isAdmin: false,
    apps: [],
    loading: true
  }

  state = {
    showNewAppModal: false
  }

  toggleNewAppModal = () => {
    this.setState({
      showNewAppModal: !this.state.showNewAppModal
    });
  }

  remove = (appId) => {
    Meteor.call('App.remove', appId, error => {
      if (error) {
        console.error(error);
      } else {
        console.log('app removed');
      }
    });
  }

  submitNewAppForm = doc => {    
    Meteor.call('App.create', doc, error => {
      if (error) {
        console.error(error);
      } else {
        this.toggleNewAppModal();
      }
    });
  }
  
  render() {
    const { 
      apps,
      loading
    } = this.props;
    const { showNewAppModal } = this.state;

    return (
      <>
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
            { loading ?
            <div>Loading...</div>:
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
                {apps.map(app =>
                  <TableRow
                    key={app._id} 
                    app={app} 
                    removeApp={this.remove} 
                    {...this.props}
                  />
                )}
              </tbody>
            </Table>
            }
          </Portlet.Body>
        </Portlet>
        <NewAppModal
          isOpen={showNewAppModal} 
          toggle={this.toggleNewAppModal}
          onSubmit={this.submitNewAppForm}
        />
      </>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("apps.all");

  return ({
    loading: !handle.ready(),
    apps: ClientApps.find().fetch()
  });
})(Apps);
