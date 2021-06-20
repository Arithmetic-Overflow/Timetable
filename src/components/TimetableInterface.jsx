import React, { useState } from 'react';
import Timetable from './Timetable';
import Legend from './Legend';
import InsertionPanel from './InsertionPanel';

// import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

// Row = 12 cols or 100%
const TimetableInterface = ({ className }) => {
  const [allocations, setAllocations] = useState({
    'Monday'    : {},
    'Tuesday'   : {},
    'Wednesday' : {},
    'Thursday'  : {},
    'Friday'    : {},
  });

  return (
    <Container fluid>
      <Row>
        <Col xl={7} lg={12}>
          <Timetable
            timeStandard='12'
            allocations={ allocations }
            setAllocations={ setAllocations }
          />
        </Col>

        <Col xl={5} lg={6}>
          <InsertionPanel />
          <Legend />
        </Col>
      </Row>
    </Container>
  );
};

export default TimetableInterface;
