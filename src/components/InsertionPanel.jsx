import React, { useState } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { availableColours, colourNameMap } from './colours';

const daysMap = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

const InsertionPanel = ({ className, subjects=['CITS3003', 'CITS3404'], startTime=8, endTime=19 }) => {
  const noSelection = '-';
  const [selectedUnit, setSelectedUnit] = useState(noSelection);

  const [selectedDay, setSelectedDay]   = useState(noSelection);

  const [selectedTime, setSelectedTime]         = useState(noSelection);
  const [selectedDuration, setSelectedDuration] = useState(noSelection);

  const availbeDurations = 
    Array(endTime - startTime + 1)
      .fill(0)
      .map((_, i) => i + 1);

  const availableTimes = 
    availbeDurations.map(i => i + startTime - 1);

  const submitAllocation = () => {
    const allocation = 5;
  }

  const darkDropdownItemStyle = {
    'backgroundColor': '#282c34',
    'color': 'white'
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
          <th colSpan='5'>
            Adding Timeslots
          </th>
        </tr>
        <tr>
          <th>
            Unit
          </th>

          <th>
            Day
          </th>

          <th>
            Time
          </th>

          <th>
            Duration
          </th>

          <th>
            Submit
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <DropdownButton
              title={ selectedUnit }
              variant='primary'
              onSelect={ (event) => setSelectedUnit(event) }
            >
              {
                subjects.map(
                  subject =>
                    <Dropdown.Item style={darkDropdownItemStyle} eventKey={ subject } key={ subject }>
                      { subject }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            <DropdownButton
              title={ selectedDay }
              variant='primary'
              onSelect={ (event) => setSelectedDay(event) }
            >
              {
                daysMap.map(
                  day =>
                    <Dropdown.Item style={darkDropdownItemStyle} eventKey={ day } key={ day }>
                      { day }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            <DropdownButton
              title={ selectedTime }
              variant='primary'
              onSelect={ (event) => setSelectedTime(event) }
            >
              {
                availableTimes.map(
                  time =>
                    <Dropdown.Item style={darkDropdownItemStyle} eventKey={ time } key={ time + ':time' }>
                      { time }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            <DropdownButton
              title={ selectedDuration }
              variant='primary'
              onSelect={ (event) => setSelectedDuration(event) }
            >
              {
                availbeDurations.map(
                  duration =>
                    <Dropdown.Item style={darkDropdownItemStyle} eventKey={ duration } key={ duration + ':duration' }>
                      { duration }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            <Button
              onClick={ submitAllocation }
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
