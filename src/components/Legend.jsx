import React, { useState } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { availableColours, colourNameMap } from './colours';

const Legend = ({ className, unitColourMap=[] }) => {
  const getColours = (n) => {
    return(
      Array(n)
        .fill(0)
        .map(
          (_, i) => colourNameMap[availableColours[i+1]]
        )
      );
  }
  const [units, setUnits]     = useState(unitColourMap);
  const [colours, setColours] = useState(getColours(units.length));

  const [unitInput, setUnitInput] = useState('');

  const addUnit = () => {
    if(
      units.length + 1 < availableColours.length &&
      unitInput !== ''
      ) {
      setColours(getColours(units.length + 1))
      setUnits([...units, unitInput]);

      setUnitInput('');
    }
  }

  const deleteRow = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  }



  return (
    <Table 
      variant='dark'
      style={{'tableLayout': 'fixed', 'width': '100%'}}
    >
      <thead>
        <tr>
          <th key={ 'legendTitle' } colSpan='3'> Legend </th>
        </tr>

        <tr key={ 'legendHeading' }>
          <th key={ 'colourHeading' }>Colour</th>
          <th key={ 'unitcodeHeading' }>Key</th>
          <th key={ 'unitDeleteHeading' }>Delete</th>    
        </tr>
      </thead>

      <tbody>
        {
          units.map((_, i) =>
            <tr key={ 'legend' + units[i] }>
              <td key={ 'keyColour' + units[i] }style={{'backgroundColor': colours[i]}}></td>
              <td key={ 'keyUnit'   + units[i] }>{ units[i] }</td>
              <td key={ 'delete' + units[i] }> <Button onClick={ () => deleteRow(i) } > ! </Button> </td>
            </tr>
          )
        }

        <tr key={ 'inputrow' }>
          <td>
            <input 
              type="text"
              onChange={
                event =>
                  (event.target.value.match(/^[0-9A-Z]+$/) || event.target.value === '') &&
                    setUnitInput(event.target.value)
              }
              value={ unitInput }
              placeholder={ 'Add a unit' }
              style={{'textAlign': 'center', 'width': '200%'}}
              onKeyDown={ event => (event.keyCode === 13) && addUnit()}
            >

            </input>
          </td>
          <td></td>
          <td>
            <Button variant='primary' onClick={addUnit}>Add</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Legend;
