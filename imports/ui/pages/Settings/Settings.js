// @flow
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Settings from '/imports/api/Settings';
import {
    AutoForm,
    AutoField,
    SubmitField,
} from 'uniforms-bootstrap4';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import SimpleSchema from 'simpl-schema';
import classnames from 'classnames';
import {
    Breadcrumb,
    Portlet
} from './../../components';
import Gateways from './Gateways';

const SettingsSchema = new SimpleSchema({
    sender: {
        type: String
    },
    txtGhanaSmsToken: {
        type: String
    }
});

export class Setting extends Component {
  static defaultProps = {
    isAdmin: false,
    setting: {},
    loading: true
  }

  state = {
    activeTab: '1',
  }

  submitNewSettingForm = doc => {    
    Meteor.call('Setting.update', doc, error => {
      if (error) {
        console.error(error);
      } else {
        console.log('saved');
      }
    });
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
  render() {
    const {
        setting,
        isAdmin,
        loading
    } = this.props;

    return (
      <>        
        <Breadcrumb
          title="Settings"
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => this.toggle('1')}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => this.toggle('2')}
            >
              Gateways
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Portlet>
                  <Portlet.Body>
                    {loading ?
                    <div>Loading...</div> :
                    <AutoForm
                        schema={SettingsSchema}
                        onSubmit={this.submitNewSettingForm}
                        model={setting}
                    >
                        <AutoField
                            name="sender"
                            disabled={!isAdmin}
                        />
                        <AutoField 
                            name="txtGhanaSmsToken"
                            type={isAdmin ? 'text' : 'password'}
                            disabled={!isAdmin}
                        />
                        <SubmitField disabled={!isAdmin}/>
                    </AutoForm>
                    }
                  </Portlet.Body>
                </Portlet>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Gateways gateways={setting.gateways || []} />
          </TabPane>
        </TabContent>
      </>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("settings.all");
  
  return ({
    loading: !handle.ready(),
    setting: Settings.findOne({ active: true })
  }); 
})(Setting);
