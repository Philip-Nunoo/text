import React from 'react';
import PropTypes from 'prop-types';
import {
    compose,
    withState,
    withHandlers
} from 'recompose';
import {
    Button,
} from 'reactstrap';
import NewGateWayModal from './NewGatewayModal';

const propTypes = {
    gateways: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ),
    toggleNewGatewayModal: PropTypes.func.isRequired,
    showNewGatewayModal: PropTypes.bool.isRequired,
};

const defaultProps = {
    gateways: [],
};

const Gateways = ({
    gateways,
    toggleNewGatewayModal,
    showNewGatewayModal
}) => <>
    {gateways.length <= 0 && 'No gateay added'}
    {gateways.length > 0 && gateways.map(
        gateway => <div key={geteway._id}>
            <h4>{gateway.name}</h4>
            <p>{gateway.description}</p>
        </div>
        )
    }
    <Button
        onClick={toggleNewGatewayModal}
    >
        New gateway
    </Button>
    <NewGateWayModal
        isOpen={showNewGatewayModal}
        toggle={toggleNewGatewayModal}
        onSubmit={toggleNewGatewayModal}
    />
</>;

Gateways.propTypes = propTypes;
Gateways.defaultProps = defaultProps;

const withData = compose(
    withState('showNewGatewayModal', 'toggleGatewayModal', false),
    withHandlers({
        toggleNewGatewayModal: ({
            showNewGatewayModal,
            toggleGatewayModal
        }) => event => {
            event.preventDefault();

            toggleGatewayModal(!showNewGatewayModal);
        }
    })
);

export default withData(Gateways);
