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
    AutoField,
    AutoFields,
    SelectField
} from 'uniforms-bootstrap4';
import NewUserSchema from './UserSchema';

const NewUserModal = ({
    isOpen,
    onSubmit,
    toggle,
    groups
}) => {
    let formRef;
    const groupOpts = groups.filter(({ active = false }) => active)
    .map(({ _id: value, name: label }) => ({ value, label }));
    
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
                    <AutoFields omitFields={['group', 'type']} />
                    <hr />
                    <AutoField name="type" />
                    <SelectField 
                        name="group"
                        options={groupOpts}
                    />
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
