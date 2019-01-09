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
        user: {}
    }

    state = {
        popoverOpen: false
    }

    togglePopover = popoverOpen => {
        this.setState({ popoverOpen: popoverOpen || !this.state.popoverOpen });
    }

    deleteRow = () => {
        this.props.removeUser && this.props.removeUser(this.props.user._id);
        this.togglePopover(false);
    }

    render() {
        const {
            loggedInUser,
            isAdmin, 
            user: { profile = {}, ...user }
        } = this.props;

        return (
            <tr>
                <td/>
                <td>{`${profile.firstName} ${profile.lastName}`}</td>
                <td>{user.emails[0].address}</td>
                <td>{user.createdAt && renderDate(user.createdAt)}</td>
                <td>{user.status.lastLogin && renderDate(user.status.lastLogin.date)}</td>
                <td>
                    {isAdmin && loggedInUser._id != user._id &&
                    <>
                        <Button
                            color="danger"
                            size="sm"
                            id={`${user._id}__popover`}
                            onClick={this.togglePopover}
                        >
                            <i className="icon-bin"/>
                        </Button>
                        <Popover 
                            placement="bottom" 
                            isOpen={this.state.popoverOpen} 
                            target={`${user._id}__popover`} 
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