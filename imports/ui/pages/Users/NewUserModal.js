import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import SimpleSchema from 'simpl-schema';
import {
    AutoForm,
    AutoFields,
    SubmitField,
    TextField,
    ValidatedForm
} from 'uniforms-bootstrap4';

const NewUserSchema = new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        label: 'Email Address',
        uniforms: {
            type: 'email'
        }
    },
    password: {
        type: String,
        uniforms: {
            type: 'password'
        }
    },
    confirmPassword: {
        type: String,
        uniforms: {
            type: 'password'
        }
    },
    group: {
        type: String,
        allowedValues: ['user', 'client', 'admin'],
        uniforms: {
            options: [
                { label: 'User', value: 'user' },
                { label: 'Client', value: 'client' },
                { label: 'Admin', value: 'admin' }
            ]
        }
    }
});

const NewUserModal = ({
    isOpen,
    onSubmit,
    toggle
}) => {
    let formRef;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Add User
            </ModalHeader>
            <ModalBody>
                <AutoForm
                    ref={ref => formRef = ref}
                    schema={NewUserSchema}
                    onSubmit={onSubmit}
                    autoComplete="off"
                >
                    <AutoFields />
                </AutoForm>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        formRef.submit();
                    }}
                    color="primary"
                >
                    Save
                </Button>
                <Button
                    onClick={toggle}
                    color="secondary"
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default NewUserModal
