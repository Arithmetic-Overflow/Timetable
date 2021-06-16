import React from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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

const generateTimeRow = (time, numCols) => {
  return (
    <tr>
      <th>
        { time }
      </th>

      { Array(numCols).fill(0).map(_ => <td> </td>) }
    </tr>
  );
}

const generateTimeRanges = (startTime, endTime, timeFormat) => {
  const numDays = dayMap.length;
  const timeRange = endTime - startTime;

  const times = Array(timeRange).fill(0).map((_, time) => timeFormat(time + startTime));

  return (
    <tbody>
      { times.map(time => generateTimeRow(time, numDays)) }
    </tbody>
  );
}

const buildTable = (startTime, endTime, timeFormat) => {
  const heading = <thead> <th> Time </th> { dayMap.map(day => <th> { day } </th>) } </thead>
  const tableBody = generateTimeRanges(8, 20, timeFormat);
  const table = <Table hover borderless variant="dark"> { heading } { tableBody } </Table>;

  return (
    table
  );
}

const Timetable = ({ className, timeStandard='12' }) => {
  const timeFormat = timeStandard == '12' ? format12Hour : format24Hour;

  return (
    buildTable(8, 20, timeFormat)
  );
};

Timetable.displayName = 'Timetable';

export default Timetable;