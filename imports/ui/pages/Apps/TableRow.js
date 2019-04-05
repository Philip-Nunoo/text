import React, { Component } from 'react';
import moment from 'moment';
import {
    Popover,
    PopoverBody,
    PopoverHeader
} from 'reactstrap';
import {
    Button,
} from './../../components';

const renderDate = date => (
    moment(date).format('DD MMM YYYY hh:mm:ss')
);

class TableRow extends Component {
    static defaultProps = {
        app: {}
    }

    state = {
        popoverOpen: false
    }

    togglePopover = (popoverOpen) => {
        this.setState({ popoverOpen: popoverOpen || !this.state.popoverOpen });
    }

    deleteRow = () => {
        this.props.removeApp(this.props.app._id);
        this.togglePopover(false);
    }

    render() {
        const {
            isAdmin, 
            app
        } = this.props;

        return (
            <tr>
                <td/>
                <td>{app.name}</td>
                <td>{app.apiKey ? app.apiKey.key : 'No api key set'}</td>
                <td>{app.groupId}</td>
                <td>
                    {isAdmin &&
                    <>
                        <Button
                            color="danger"
                            size="sm"
                            id={`${app._id}__popover`}
                            onClick={this.togglePopover}
                        >
                            <i className="icon-bin"/>
                        </Button>
                        <Popover 
                            placement="bottom"
                            isOpen={this.state.popoverOpen} 
                            target={`${app._id}__popover`}
                            toggle={this.toggle}
                        >
                            <PopoverHeader>
                                Delete?
                                <span 
                                    aria-hidden="true" 
                                    className="close"
                                    style={{ fontSize: 'initial' }}
                                    onClick={() => this.togglePopover(false)}
                                >
                                    &times;
                                </span>
                            </PopoverHeader>
                            <PopoverBody>
                                <p>Delete permanently</p>
                                <Button color="danger" block onClick={this.deleteRow}>Delete</Button>
                            </PopoverBody>
                        </Popover>
                    </>}
                </td>
            </tr>
        );
    }
}

export default TableRow;