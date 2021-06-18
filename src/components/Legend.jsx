import React, { useState } from 'react';
import 'react-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Legend = ({ className, unitColourMap={} }) => {
  const [units, setUnits]     = useState(Object.keys(unitColourMap));
  const [colours, setColours] = useState(Object.values(unitColourMap));

  const defaultInputText = "";
  const [inputText, setInputText] = useState('');

  const [unitInput, setUnitInput] = useState('');

  const addUnit = () => {
    setUnits([...units, unitInput]);
    setColours([...colours, '#ff0000']);

    setInputText('');
  }



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
          units.map((_, i) =>
            <tr key={ 'legend' + units[i] }>
              <td key={ 'keyColour' + units[i] }style={{'backgroundColor': colours[i]}}></td>
              <td key={ 'keyUnit'   + units[i] }>{ units[i] }</td>
            </tr>
          )
        }

        <tr key={ 'inputrow' }>
            <td>
              <input 
                type="text"
                onChange={event => {setUnitInput(event.target.value)}}
                value={ unitInput }
                placeholder={ 'Add a unit' }
                style={{'textAlign': 'center'}}
              >

              </input>
            </td>
          <td>
            <Button variant='primary' onClick={addUnit}></Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Legend;
