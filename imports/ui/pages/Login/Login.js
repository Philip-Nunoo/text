// @flow
import React from 'react';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  AutoField,
  SubmitField,
  TextField,
  ValidatedForm
} from 'uniforms-bootstrap4';

const LoginSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email Address',
    uniforms: {
      placeholder: 'name@address.com',
      type: 'email'
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
          <AutoForm schema={LoginSchema}>
            <AutoField name="email" />
            <AutoField name="password" />
            <SubmitField inputClassName="btn btn-lg btn-block btn-primary mb-3" />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
