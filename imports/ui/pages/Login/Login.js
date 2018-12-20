// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  AutoFields,
  SubmitField,
  TextField,
  ValidatedForm
} from 'uniforms-bootstrap4';

const LoginSchema = new SimpleSchema({
  user: {
    type: String,
    label: 'Email or Username',
    uniforms: {
      placeholder: 'Email / username',
    }
  },
  password: {
    type: String,
    uniforms: {
      placeholder: 'Enter your password',
      type: 'password'
    }
  }
});

const Login = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={5} xl={4} className="my-5">
          <h1 className="display-4 text-center mb-3">
            Sign in
          </h1>
          <p className="text-muted text-center mb-5">
            TSF online sms portal
          </p>
          <AutoForm
            schema={LoginSchema}
            onSubmit={({ user, password }) => {
              Meteor.loginWithPassword(user, password);
            }}
          >
            <AutoFields />
            <SubmitField inputClassName="btn btn-lg btn-block btn-primary mb-3" />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
