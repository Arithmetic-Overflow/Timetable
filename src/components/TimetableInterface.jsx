import React, { useState } from 'react';
import Timetable from './Timetable';
import Legend from './Legend';
import InsertionPanel from './InsertionPanel';

// import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

// Row = 12 cols or 100%

const TimetableInterface = ({ className }) => {
  const startTime = 8;
  const endTime   = 21;

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
    // '#66dd00',
    // '#ff77ff',
    // '#dddd22'
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
    return getAvailableColours().length === 0;
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
    const unitName = units[index];

    setUnits(units.filter((_, i) => i !== index));
    setUnitColours(unitColours.filter((_, i) => i !== index));

    const newAllocations = {...allocations};

    const days  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = 
      Array(endTime - startTime)
      .fill(0)
      .map((_, i) => i + startTime);

    days.map(
      day =>
        times.map(
          time => {
            const timeStr = String(time);
            const allocation = newAllocations[day][timeStr];
            newAllocations[day][timeStr] =
              allocation === unitName ?
                '' :
                allocation;

            return allocations === unitName;
          }
        )
    );

    setAllocations(newAllocations);
  }

  return (
    <Container fluid>
      <Row>
        <Col xl={7} lg={12}>
          <Timetable
            unitList={ units }
            colourList={ unitColours }
            allocs={ allocations }
            allocateTime={ allocateTime }
            timeStandard='12'
          />
        </Col>

        <Col xl={5} lg={6}>
          <InsertionPanel
            unitList={ units }
            allocations={ allocations }
            allocateTime={ allocateTime }
          />
          <Legend
            unitList={ units }
            addUnit={ addUnit }
            deleteUnitIndex={ deleteUnitIndex }

            unitColours={ unitColours }
            maxColoursReached={ maxColoursReached() }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TimetableInterface;
