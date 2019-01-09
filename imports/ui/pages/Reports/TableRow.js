import React, { Component } from 'react';
import moment from 'moment';
import {
    Popover,
    PopoverBody,
    PopoverHeader
} from 'reactstrap';
import {
    Button,
    Label
} from './../../components';

const renderDate = date => (
    moment(date).format('DD MMM YYYY hh:mm:ss')
);

class TableRow extends Component {
    static defaultProps = {
        report: {}
    }

    state = {
        popoverOpen: false
    }

    togglePopover = (popoverOpen) => {
        this.setState({ popoverOpen: popoverOpen || !this.state.popoverOpen });
    }

    deleteRow = () => {
        this.props.removeReport(this.props.app._id);
        this.togglePopover(false);
    }

    renderStatus = status => {
        let state = <Label>Not found</Label>;
        switch (status) {
          case 'new':
          case 'pending': {
            state = <Label color="info">Pending</Label>;
            break;
          }
          case 'scheduled': {
            state = <Label color="secondary">Scheduled</Label>;
            break;
          }
          case 'sent': {
            state = <Label color="success">Sent</Label>;
            break;
          }
          default:
            break;
        }
        return state;
      }

    render() {
        const {
            isAdmin, 
            report
        } = this.props;

        return (
            <tr>
                <td>{renderDate(report.createdAt)}</td>
                <td>{report.origin}</td>
                <td>{report.to}</td>
                <td>{report.message}</td>
                <td>{this.renderStatus(report.status)}</td>
                <td>
                    {isAdmin &&
                    <>
                        <Button
                            color="danger"
                            size="sm"
                            id={`pop-${report._id}__popover`}
                            onClick={this.togglePopover}
                        >
                            <i className="icon-bin"/>
                        </Button>
                        <Popover 
                            placement="bottom"
                            isOpen={this.state.popoverOpen} 
                            target={`pop-${report._id}__popover`}
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