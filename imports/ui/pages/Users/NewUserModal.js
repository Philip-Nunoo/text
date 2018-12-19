import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

const NewUserModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            Add User
        </ModalHeader>
        <ModalBody>
            Form here
        </ModalBody>
        <ModalFooter>
            <Button
                onClick={toggle}
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
