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
    AutoFields
} from 'uniforms-bootstrap4';
import GroupSchema from './GroupSchema';

const NewGroupModal = ({
    isOpen,
    onSubmit,
    toggle
}) => {
    let formRef;
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Add Group
            </ModalHeader>
            <ModalBody>
                <AutoForm
                    ref={ref => formRef = ref}
                    schema={GroupSchema}
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

export default NewGroupModal
