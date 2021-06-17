import React from 'react';
import Table from 'react-bootstrap/Table';
import Timeslot from './Timeslot'

const formatTime   = time => time > 9 ? time : '0' + time;

const _12Hour = time => (time - 1) % 12 + 1;
const _24Hour = time => time;

const format12Hour = time => formatTime(_12Hour(time));
const format24Hour = time => formatTime(_24Hour(time));

const dayMap = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

const gents = (t, timeFormat, d, av) => {
  const dayStr = dayMap[d];
  const a = [av[dayStr][t]];
  return <Timeslot key={ dayStr + t } day={ dayStr } time={ t } allocation={ a } allocations={ av } />;
}

const generateTimeRow = (time, timeFormat, numCols, allocations) => {
  return (
    <tr key={ 'timerow' + time }>
      <th key={ 'time' + time }>
        { timeFormat(time) }
      </th>

      { Array(numCols).fill(0).map((_, day) => gents(time, timeFormat, day, allocations)) }
    </tr>
  );
}

const generateTimeRanges = (startTime, endTime, allocations, timeFormat) => {
  const numDays = dayMap.length;
  const timeRange = endTime - startTime;

  const times = Array(timeRange).fill(0).map((_, time) => time + startTime);

  return (
    <tbody>
      { times.map(time => generateTimeRow(time, timeFormat, numDays, allocations)) }
    </tbody>
  );
}

const buildTable = (className, allocations, startTime, endTime, timeFormat) => {
  const heading = 
    <thead>
      <tr key={ 'tableheading' }>
        <th key={ 'time' }>Time</th>
        { dayMap.map(day => <th key={ 'dayheading' + day } style={{'overflow': 'hidden'}} >{ day }</th>) }
      </tr>
    </thead>;

  const tableBody = generateTimeRanges(8, 20, allocations, timeFormat);
  const table =
    <Table
    className={ className }
    bordered
    variant="dark"
    style={{'tableLayout': 'fixed'}}
    >
      { heading }{ tableBody }
    </Table>;

  return (
    table
  );
}

const Timetable = ({ className, timeStandard='12', allocations }) => {
  if(allocations === undefined) {
    const allocMap = {};
    dayMap.map(day => allocMap[day] = {});
    allocations = allocMap;
  }

  const timeFormat = timeStandard === '12' ? format12Hour : format24Hour;

  return (
    buildTable(className, allocations, 8, 20, timeFormat)
  );
};

Timetable.displayName = 'Timetable';

export default Timetable;