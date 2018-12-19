import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

const NewAppModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            Add App
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

export default NewAppModal;
