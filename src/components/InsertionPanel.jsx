import React, { useState } from 'react';
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
  subjects=['CITS3003', 'CITS3404'],
  allocations,
  allocateTime,
  startTime=8,
  endTime=21
}) => {
  const noSelection = '-';
  const noTimeSelection = '';

  const [selectedUnit, setSelectedUnit] = useState(noSelection);
  const [selectedDay, setSelectedDay]   = useState(noSelection);

  const [selectedStartTime, setSelectedStartTime] = useState(noTimeSelection);
  const [selectedEndTime, setSelectedEndTime]     = useState(noTimeSelection);

  // allocates times based on the selected attributes
  const submitAllocation = () => {
    if(
          (selectedUnit !== noSelection)
          && (selectedDay !== noSelection)
          && (selectedStartTime !== noTimeSelection)
          && (selectedEndTime !== noTimeSelection)
    ) {
      const start = parseInt(selectedStartTime.slice(0, 2));
      const end   = parseInt(selectedEndTime.slice(0, 2));

      if(start < endTime
        && end <= endTime
        && start >= startTime
        && end > startTime
        ) {
        console.log('here')
        Array(end - start)
          .fill(0)
          .map((_, i) => i + start)
          .map(time => allocateTime(selectedDay, time, 2));
      }
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
              variant='primary'
              onSelect={ (event) => setSelectedUnit(event) }
            >
              {
                subjects.map(
                  subject =>
                    <Dropdown.Item
                      style={ darkInputStyle }
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
              variant='primary'
              onSelect={ (event) => setSelectedDay(event) }
            >
              {
                daysMap.map(
                  day =>
                    <Dropdown.Item
                      style={ darkInputStyle }
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
              onChange={(event) => {setSelectedEndTime(event.target.value); console.log(event.target.value.slice(0,2))}}
              value={ selectedEndTime }
            />
          </td>
        </tr>

        <tr>
          <td colSpan='2'>
            <Button
              onClick={ submitAllocation }
              style={{'width': '100%'}}
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
