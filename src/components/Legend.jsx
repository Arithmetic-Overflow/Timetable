import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Legend = ({ className, unitColours={} }) => {
  const [unitMap, setUnitMap] = useState(unitColours);
  const units   = Object.keys(unitMap);
  const colours = Object.values(unitMap);

  console.log(units)
  units.map(_ => console.log('!'));

  return (
    <Table variant='dark'>
      <thead>
        <tr key={ 'legendHeading' }>
          <th key={ 'colourHeading' }>Colour</th>
          <th key={ 'unitcodeHeading' }>Key</th>    
        </tr>
      </thead>

      <tbody>
        {
          Array(units).fill(0)
            .map((_, i) => 
              <tr key={ 'legend' + units[i] }>
                <td key={ 'keyColour' + units[i] }style={{'backgroundColor': colours[i]}}></td>
                <td key={ 'keyUnit'   + units[i] }>{ units[i] }</td>
              </tr>
            )
        }

        <tr>
            <td>
              <input type="text">
              </input>
            </td>
          <td>
            <Button></Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Legend;
