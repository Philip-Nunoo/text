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
import SimpleSchema from 'simpl-schema';
import {
    Breadcrumb,
    Portlet
} from './../../components';

const SettingsSchema = new SimpleSchema({
    sender: {
        type: String
    },
    txtGhanaSmsToken: {
        type: String
    }
});

export class Setting extends Component {
  state = {}

  submitNewSettingForm = doc => {    
    Meteor.call('Setting.update', doc, error => {
      if (error) {
        console.error(error);
      } else {
        console.log('saved');
      }
    });
  }
  
  render() {
    const {
        setting = {}, 
        isAdmin = false
    } = this.props;

    return (
      <>
        <Breadcrumb
          title="Settings"
        />
        <Portlet>
          <Portlet.Body>
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
          </Portlet.Body>
        </Portlet>
      </>
    );
  }
}

export default withTracker(() => ({
  setting: Settings.findOne({ active: true })
}))(Setting);
