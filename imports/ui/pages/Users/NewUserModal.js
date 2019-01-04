import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {
    AutoForm,
    AutoFields,
    SubmitField,
    TextField,
    ValidatedForm
} from 'uniforms-bootstrap4';
import NewUserSchema from './UserSchema';

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
