import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Timeslot from './Timeslot'

// time formatting functions...

// add leading 0s
const formatTime   = time => time > 9 ? time : '0' + time;

const _12Hour = time => (time - 1) % 12 + 1;
const _24Hour = time => time;

const format12Hour = time => {
  const suffix = time < 12 ? 'am' : 'pm';
  return formatTime(_12Hour(time)) + suffix;
}

const format24Hour = time => formatTime(_24Hour(time));

const dayMap = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

// return a timeslot component based on the allocation of the timeslot
const getTimeslot = (
  day,
  time,
  allocations,
  allocateTime,
  units,
  unitColours
) => {
  const dayName = dayMap[day];
  const allocation = allocations[dayName][time];
  const allocationValue = allocation ? allocation : '';

  const unitIndex = units.indexOf(allocationValue);

  const allocateTimeslot = index => allocateTime(dayName, time, units[index]);
  
  return (
    <Timeslot
        key={ dayName + time }
        allocationIndex={ unitIndex }
        unitColours={ unitColours }
        allocateTimeslot={ allocateTimeslot }
    />
  );
}

// generates a row of timeslots in the table
const generateTimeRow = (
  time,
  timeFormat,
  numCols,
  allocations,
  allocateTime,
  units,
  unitColours
) => {
  return (
    <tr key={ 'timerow' + time }>
      <th key={ 'time' + time }>
        { timeFormat(time) }
      </th>

      {
        Array(numCols)
          .fill(0)
          .map(
            (_, day) => 
            getTimeslot(day, time, allocations, allocateTime, units, unitColours)
          )
      }
    </tr>
  );
}

// generates all rows of the table
const generateTimeRanges = (
  startTime,
  endTime,
  allocations,
  allocateTime,
  units,
  unitColours,
  timeFormat
) => {
  const numDays = dayMap.length;
  const timeRange = endTime - startTime;

  const times = Array(timeRange).fill(0).map((_, time) => time + startTime);

  return (
    times.map(time => generateTimeRow(time, timeFormat, numDays, allocations, allocateTime, units, unitColours))
  );
}

const Timetable = ({
  className,
  allocs,
  allocateTime,
  unitList,
  colourList,
  startTime=8,
  timeStandard='12',
  endTime=21
}) => {
  const [allocations, setAllocations] = useState(allocs);

  useEffect(
    () => {setAllocations(allocs)},
    [allocs]
  );

  const [units, setUnits] = useState(unitList);
  const [unitColours, setUnitColours] = useState(colourList);

  useEffect (
    () => {
      setUnits(unitList);
      setUnitColours(colourList)
    },
    [unitList, colourList]
  );

  const timeFormat = timeStandard === '12' ? format12Hour : format24Hour;

  const heading = 
    <thead>
      <tr key={ 'tableheading' }>
        <th key={ 'time' }>Time</th>
        { dayMap.map(day => <th key={ 'dayheading' + day } style={{'overflow': 'hidden'}} >{ day }</th>) }
      </tr>
    </thead>;

  const table =
    <Table
    className={ className }
    bordered
    variant="dark"
    style={{'tableLayout': 'fixed'}}
    >
      { heading }
      <tbody>
        {
          generateTimeRanges(
            startTime,
            endTime,
            allocations,
            allocateTime,
            units,
            unitColours,
            timeFormat
          ) 
        }
      </tbody>
    </Table>;

  return (
    table
  );
};

export default Timetable;