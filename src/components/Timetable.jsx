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

const gents = (t, d, av) => {
  const a = [av[dayMap[d]][t]];
  console.log(a)
  return <Timeslot allocation={a} />;
}

const generateTimeRow = (time, numCols, allocations) => {
  return (
    <tr>
      <th>
        { time }
      </th>

      { Array(numCols).fill(0).map((_, day) => gents(time, day, allocations)) }
    </tr>
  );
}

const generateTimeRanges = (startTime, endTime, allocations, timeFormat) => {
  const numDays = dayMap.length;
  const timeRange = endTime - startTime;

  const times = Array(timeRange).fill(0).map((_, time) => timeFormat(time + startTime));

  return (
    <tbody>
      { times.map(time => generateTimeRow(time, numDays, allocations)) }
    </tbody>
  );
}

const buildTable = (className, allocations, startTime, endTime, timeFormat) => {
  const heading = 
    <thead>
      <tr>
        <th>Time</th>
        { dayMap.map(day => <th>{ day }</th>) }
      </tr>
    </thead>;

  const tableBody = generateTimeRanges(8, 20, allocations, timeFormat);
  const table = <Table className={ className } hover borderless variant="dark">{ heading }{ tableBody }</Table>;

  return (
    table
  );
}

const Timetable = ({ className, timeStandard='12', allocations={'Monday': {'14':2}, 'Tuesday': {'17':3}, 'Wednesday': {}, 'Thursday': {}, 'Friday': {}} }) => {
  const timeFormat = timeStandard === '12' ? format12Hour : format24Hour;
  console.log(allocations)
  return (
    buildTable(className, allocations, 8, 20, timeFormat)
  );
};

Timetable.displayName = 'Timetable';

export default Timetable;