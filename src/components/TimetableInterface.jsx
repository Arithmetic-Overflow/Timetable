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

  // allots a time to a specific unit
  const allocateTime = (day, time, unit) => {
    const newAllocations = {...allocations};
    newAllocations[day][time] = unit;
    setAllocations(newAllocations);
  }

  const [units, setUnits]               = useState([]);

  const allColours = [
    '#ee2200',
    '#22eeee',
    '#66dd00',
    '#ff77ff',
    '#dddd22'
  ]
  const [unitColours, setUnitColours] = useState([]);

  const getAvailableColours = () => {
    return (
      allColours.filter(
        colour => !unitColours.includes(colour)
      )
    );
  }

  const maxColoursReached = () => {
    return getAvailableColours.length > 0;
  }

  const addUnit = unit => {
    if(!maxColoursReached()) {
      const newColour = getAvailableColours()[0];
      setUnits([...units, unit]);
      setUnitColours([...unitColours, newColour]);
    }
  }

  // delete a unit and remove its colour from the unitColours array
  const deleteUnitIndex = index => {
    setUnits(units.filter((_, i) => i !== index));
    setUnitColours(unitColours.filter((_, i) => i !== index));
  }

  return (
    <Container fluid>
      <Row>
        <Col xl={7} lg={12}>
          <Timetable
            timeStandard='12'
            allocs={ allocations }
            allocateTime={ allocateTime }
          />
        </Col>

        <Col xl={5} lg={6}>
          <InsertionPanel
            allocations={ allocations }
            allocateTime={ allocateTime }
          />
          <Legend
            unitList={ units }
            addUnit={ addUnit }
            deleteUnitIndex={ deleteUnitIndex }

            unitColours={ unitColours }
            maxColoursReached={ maxColoursReached }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TimetableInterface;
