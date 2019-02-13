// @flow
import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import {
  CardStats,
  UsersCount,
  AppsCount,
  ReportsCount,
} from './components';

const Overview = () => {
  return (
    <div>
      <Row>
        <Col md={6} lg={3} sm={6}>
          <CardStats category="Users" icon="icon-users">
            <UsersCount />
          </CardStats>
        </Col>
        <Col md={6} lg={3} sm={6}>
          <CardStats category="Apps" icon="icon-sphere">
            <AppsCount />
          </CardStats>
        </Col>
        <Col md={6} lg={3} sm={6}>
          <CardStats category="Reports" icon="icon-reports">
            <ReportsCount />
          </CardStats>
        </Col>
        <Col md={6} lg={3} sm={6}>
          <CardStats category="Others" icon="icon-podcast">
            0
          </CardStats>
        </Col>
      </Row>
    </div>
  )
}

export default Overview
