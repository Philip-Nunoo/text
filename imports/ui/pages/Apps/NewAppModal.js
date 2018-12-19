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
    LongTextField,
    ValidatedForm
} from 'uniforms-bootstrap4';

const NewAppSchema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        uniforms: {
            component: LongTextField
        }
    }
});

const NewAppModal = ({ isOpen, toggle, onSubmit }) => {
    let formRef;
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Add App
            </ModalHeader>
            <ModalBody>
                <AutoForm
                    ref={ref => formRef = ref}
                    schema={NewAppSchema}
                    onSubmit={onSubmit}
                >
                    <AutoFields />
                </AutoForm>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        formRef.submit();
                    }}
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
    );
}

export default NewAppModal;
