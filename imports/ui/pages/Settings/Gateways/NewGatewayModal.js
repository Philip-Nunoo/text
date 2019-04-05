import React from 'react';
import PropTypes from 'prop-types';
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
    LongTextField,
    ListField,
} from 'uniforms-bootstrap4';

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {};

const NewAppSchema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        uniforms: {
            component: LongTextField,
        },
    },
    headers: {
        type: Array,
        optional: true,
        uniforms: {
            component: ListField,
            addIcon: 'add',
            removeIcon: 'remove'
        },
    },
    'headers.$': {
        type: Object,
    },
    'headers.$.key': {
        type: String,
        uniforms: {
        },
    },
    'headers.$.value': {
        type: String,
        uniforms: {
        },
    },
    'headers.$.description': {
        type: String,
        optional: true,
        uniforms: {
            component: LongTextField,
        },        
    },
    body: {
        type: Array,
        optional: true,
        min: 2,
        uniforms: {
            component: ListField,
            addIcon: 'add',
            removeIcon: 'remove',
        },
    },
    'body.$': {
        type: Object,
    },
    'body.$.key': {
        type: String,
        uniforms: {
        },
    },
    'body.$.value': {
        type: String,
        optional: true,
        uniforms: {
        },
    },
    'body.$.description': {
        type: String,
        optional: true,
        uniforms: {
            component: LongTextField,
        },
    },
    numberField: {
        type: String,
    },
    messageField: {
        type: String,
    },
});

const NewGateWayModal = ({ isOpen, toggle, onSubmit }) => {
    let formRef;
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Add Gateway
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

NewGateWayModal.propTypes = propTypes;
NewGateWayModal.defaultProps = defaultProps;

export default NewGateWayModal;
