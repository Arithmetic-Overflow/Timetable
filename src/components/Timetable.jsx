import React from 'react';
import Table from 'react-bootstrap/Table';
import Timeslot from './Timeslot'

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

const generateTimeRow = (time, timeFormat, numCols, allocations, setAllocations) => {
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
            <Timeslot
              key={ dayMap[day] + time }
              day={ dayMap[day] }
              time={ time }
              allocations={ allocations }
              setAllocations={ setAllocations }
            />
          )
      }
    </tr>
  );
}

const generateTimeRanges = (
  startTime,
  endTime,
  allocations,
  setAllocations,
  timeFormat
) => {
  const numDays = dayMap.length;
  const timeRange = endTime - startTime;

  const times = Array(timeRange).fill(0).map((_, time) => time + startTime);

  return (
    times.map(time => generateTimeRow(time, timeFormat, numDays, allocations, setAllocations))
  );
}

const Timetable = ({
  className,
  timeStandard='12',
  allocations,
  setAllocations,
  startTime=8,
  endTime=20
}) => {
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
        { generateTimeRanges(8, 20, allocations, setAllocations, timeFormat) }
      </tbody>;
    </Table>;

  return (
    table
  );
};

Timetable.displayName = 'Timetable';

export default Timetable;