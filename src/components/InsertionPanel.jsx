import React, { useState, useEffect } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// import { availableColours, colourNameMap } from './colours';

const daysMap = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

const InsertionPanel = ({
  className,
  unitList,
  allocations,
  allocateTime,
  startTime=8,
  endTime=21
}) => {
  const [units, setUnits] = useState(unitList);

  useEffect(
    () => {setUnits(unitList)},
    [unitList]
  );

  // represents empty input values
  // '-' is a stylistic choice
  const noSelection = '-';
  const noTimeSelection = '';

  // variables to track dropdown input values
  const [selectedUnit, setSelectedUnit] = useState(noSelection);
  const [selectedDay, setSelectedDay]   = useState(noSelection);

  // variables to track time input values
  const [selectedStartTime, setSelectedStartTime] = useState(noTimeSelection);
  const [selectedEndTime, setSelectedEndTime]     = useState(noTimeSelection);

  const containsBlankInput = () => {
    return (
      (selectedUnit         === noSelection)
      || (selectedDay       === noSelection)
      || (selectedStartTime === noTimeSelection)
      || (selectedEndTime   === noTimeSelection)
    );
  }

  const timesInCorrectRange = (start, end) => {
    return (
      (start    <   endTime)
      && (end   <=  endTime)
      && (start >=  startTime)
      && (end   >   startTime)
    );
  }

  const validInputs = (start, end) => {
    return (
      !containsBlankInput() && timesInCorrectRange(start, end)
    );
  }

  // allocates times based on the selected attributes
  const submitAllocation = () => {
    const start = parseInt(selectedStartTime.slice(0, 2));
    const end   = parseInt(selectedEndTime.slice(0, 2));

    // blank fields not allowed
    if(validInputs(start, end)) {
      console.log('here')
      Array(end - start)
        .fill(0)
        .map((_, i) => i + start)
        .map(time => allocateTime(selectedDay, time, selectedUnit));
    }

    setSelectedUnit(noSelection);
    setSelectedDay(noSelection);
    setSelectedStartTime(noTimeSelection);
    setSelectedEndTime(noTimeSelection);
  }
  
  const darkInputStyle = {
    'backgroundColor': '#282c34',
    'color': 'white',
    'fontSize': '16pt'
  };

  return (
    <Table
      className={ className }
      bordered
      variant="dark"
      style={{'tableLayout': 'fixed'}}
    >
      <thead>
        <tr>
          <th colSpan='2'>
            Adding Timeslots
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
          Unit:
            <DropdownButton
              title={ selectedUnit }
              variant='outline-success'
              onSelect={ (event) => setSelectedUnit(event) }
            >
              {
                units.map(
                  subject =>
                    <Dropdown.Item
                      eventKey={ subject } 
                      key={ subject }
                    >
                      { subject }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            Day:
            <DropdownButton
              title={ selectedDay }
              variant='outline-success'
              onSelect={ (event) => setSelectedDay(event) }
            >
              {
                daysMap.map(
                  day =>
                    <Dropdown.Item
                      eventKey={ day } 
                      key={ day }
                    >
                      { day }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>
        </tr>

        <tr>
          <td>
            Start:

            <br />

            <input
              type='time'
              style={ darkInputStyle }
              onChange={(event) => {setSelectedStartTime(event.target.value)}}
              value={ selectedStartTime }
            />
          </td>

          <td>
            End Time:
  
            <br />
            
            <input
              type='time'
              style={ darkInputStyle }
              onChange={(event) => {setSelectedEndTime(event.target.value);}}
              value={ selectedEndTime }
            />
          </td>
        </tr>

        <tr>
          <td colSpan='2'>
            <Button
              onClick={ submitAllocation }
              style={{'width': '100%'}}
              variant='outline-success'
            >
              Allocate
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default InsertionPanel;
