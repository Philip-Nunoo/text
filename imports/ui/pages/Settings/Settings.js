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
  static defaultProps = {
    isAdmin: false,
    setting: {},
    loading: true
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
