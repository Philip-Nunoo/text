//@flow
import React from 'react';
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import {
    Navbar
} from './../components';
import Config from './../config';
import './dashboard.css';

const SidebarMenus = [
    {
        name: "Dashboard",
        url: "overview",
        icon: "meter"
    },
    {
        name: "Send Messages",
        url: "send-message",
        icon: "podcast"
    },
    {
        name: "Reports",
        url: "reports",
        icon: "reports"
    },
    {
        name: "Apps",
        url: "apps",
        icon: "sphere"
    },
    {
        name: "Users",
        url: "users",
        icon: "users"
    }
];

const Dashboard = ({children, menus = SidebarMenus, ...rest}) => {
  return (
      <div className="wrapper page page-dashboard">
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>{Config.appName}</h3>
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
            <Navbar />
            <div className="main">
                {children}
            </div>
        </div>
    </div>
  );
}

export default Dashboard
