import React from 'react';
import {
    Col,
    Card,
    CardBody,
    Row,
} from 'reactstrap';

const CardStats = ({
    category,
    children,
    icon,
}) => (
    <Card className="card-stats">
        <CardBody>
            <Row>
                <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                        {icon && <i className={icon} />}
                    </div>
                </Col>
                <Col xs={7} md={8}>
                    <div className="numbers">
                        {category && <p className="card-category">{category}</p>}
                        {<p className="card-title">{children}</p>}
                    </div>
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default CardStats;