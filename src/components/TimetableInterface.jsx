import React, { useState } from 'react';

import Timetable from './Timetable';
import Legend from './Legend';
import InsertionPanel from './InsertionPanel';
import Toolbar from './Toolbar/Toolbar';

// import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

// Row = 12 cols or 100%

const TimetableInterface = ({ className }) => {
  const startTime = 8;
  const endTime   = 21;

  // keeps track of hour intervals (called timeslots)
  // is in the form of {day : {time : unit}}
  // unit is `undefined` if not set to anything
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

  const startingColours = [
    '#ee2200',
    '#c92fde',
    '#22eeee',
    '#66dd00',
    '#dddd22'
  ]

  const [allColours, setAllColours] = useState(startingColours);

  const addColour = colour => setAllColours([...allColours, colour]);

  // an array of units and colours
  // the unit in units[i] has the colour in unitColours[i]
  const [units, setUnits]             = useState([]);
  const [unitColours, setUnitColours] = useState([]);

  // lists all colours not being used
  const getAvailableColours = () => {
    return (
      allColours.filter(
        colour => !unitColours.includes(colour)
      )
    );
  }

  // returns whether all colours are exhausted
  const allColoursExhausted = () => {
    return getAvailableColours().length === 0;
  }

  // appends a unit to the units array
  // appends a colour to the colour array to pair with it
  const addUnit = unit => {
    if(!allColoursExhausted()) {
      if(units.indexOf(unit) === -1) {
        const newColour = getAvailableColours()[0];
        setUnits([...units, unit]);
        setUnitColours([...unitColours, newColour]);
      }
    }
  }

  // delete a unit and remove its colour from the unitColours array
  const deleteUnitIndex = index => {
    const unitName = units[index];

    // remove it from the units and colours array
    setUnits(units.filter((_, i) => i !== index));
    setUnitColours(unitColours.filter((_, i) => i !== index));

    // remove all instances of the unit from any previous allocations
    const newAllocations = {...allocations};

    const days  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = 
      Array(endTime - startTime)
      .fill(0)
      .map((_, i) => i + startTime);

    // iterate over all allocations setting the value of unitName to the empty string
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
    <Container fluid style={{'margin': '4vh 4vw 4vh 4vw'}}>
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
            allColoursExhausted={ allColoursExhausted }
          />
          <Toolbar
            unitList={ units }
            colourList={ unitColours }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TimetableInterface;
