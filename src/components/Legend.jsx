import React, { useState, useEffect } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Legend = ({ className, unitList, unitColours, addUnit, deleteUnitIndex, maxColoursReached }) => {
  const [units, setUnits]     = useState(unitList);
  const [colours, setColours] = useState(unitColours);

  const [unitInput, setUnitInput] = useState('');

  useEffect(
    () => {
      setUnits(unitList);
      setColours(unitColours);
    },
    [unitList, unitColours]
  );

  const [maxUnitsReached, setMaxUnitsReached] = useState(maxColoursReached);

  useEffect(
    () => setMaxUnitsReached(maxColoursReached),
    [maxColoursReached]
  );

  const handleUnitAddition = () => {
    if(!maxColoursReached) {
      addUnit(unitInput);
      setUnitInput('');
    }
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

        {
          units.length > 0 &&
            <tr key={ 'legendHeading' }>
              <th key={ 'colourHeading' }>Colour</th>
              <th key={ 'unitcodeHeading' }>Key</th>
              <th key={ 'unitDeleteHeading' }>Delete</th>    
            </tr>
        }
      </thead>

      <tbody>
        {
          units.map((_, i) =>
            <tr key={ 'legend' + units[i] }>
              <td key={ 'keyColour' + units[i] }style={{'backgroundColor': colours[i]}}></td>
              <td key={ 'keyUnit'   + units[i] }>{ units[i] }</td>
              <td key={ 'delete' + units[i] }> 
                <Button 
                onClick={ () => deleteUnitIndex(i) }
                style={{'width': '100%'}}
                >
                  !
                </Button>
              </td>
            </tr>
          )
        }

        {
          (!maxUnitsReached) &&            
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
                  onKeyDown={ event => (event.keyCode === 13) && handleUnitAddition()}
                >          
                </input>
              </td>
              <td></td>
              <td>
                <Button
                  variant='primary'
                  onClick={handleUnitAddition}
                  style={{'width': '100%'}}
                >
                  Add
                </Button>
              </td>
            </tr>
        }

        {
          (maxUnitsReached) &&
            <tr key={ 'maxReached' }>
              <td colSpan='3'>
                All Colours Exhausted
              </td>
            </tr>
        }

      </tbody>
    </Table>
  );
};

export default Legend;
