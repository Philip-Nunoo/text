//@flow
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import Config, {
    SidebarMenus
} from './../config';
import './dashboard.css';

class Dashboard extends Component {
    state = { isOpen: false };

    render() {
        const {
            children, 
            menus = SidebarMenus, 
            ...rest
        } = this.props;

        return (
            <div className="wrapper page page-dashboard">
                <nav id="sidebar">
                  <div className="sidebar-header">
                      <h6 className="mb-0">{Config.appName}</h6>
                  </div>
                  <Nav className="list-unstyled components" style={{ display: 'block' }}>
                      {menus.map((menu, idx) => 
                          <NavItem key={idx}>
                              <NavLink tag={Link} to={menu.url}>
                                  <i className={`icon-${menu.icon}`} />
                                  {menu.name}
                              </NavLink>
                          </NavItem>
                      )}
                  </Nav>
                </nav>
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="ml-auto navbar-nav">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => Meteor.logout()}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </ul>
                        </div>
                    </nav>
                    <div className="main">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard
