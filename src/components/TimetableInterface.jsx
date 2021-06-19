import React from 'react';
import Timetable from './Timetable';
import Legend from './Legend';
import InsertionPanel from './InsertionPanel';

// import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

// Row = 12 cols or 100%
const TimetableInterface = ({ className }) => {
  return (
    <Container fluid>
      <Row>
        <Col xl={8} lg={12}>
          <Timetable timeStandard='12'/>
        </Col>

        <Col xl={4} lg={12}>
          <InsertionPanel />
          <Legend />
        </Col>
      </Row>
    </Container>
  );
};

export default TimetableInterface;
