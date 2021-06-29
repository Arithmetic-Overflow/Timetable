import React, { useState, useEffect } from 'react';

import ColourSelect from './ColourSelect';
import SplitSelect from './SplitSelect';

import Table from 'react-bootstrap/Table'

const Toolbar = ({
  className,
  currentSelection,
  unitList,
  colourList,
  setColour,
  activeColour,
  activeSplit,
  setSplit
}) => {
  const [selection, setSelection] = useState(currentSelection);
  const [units, setUnits] = useState(unitList);
  const [unitColours, setUnitColours] = useState(colourList);

  useEffect(
    () => {
      setUnits(unitList);
      setUnitColours(colourList);
    },
    [unitList, colourList]
  );

  const [selectedSplit, setSelectedSplit] = useState(activeSplit);

  useEffect(
    () => {setSelectedSplit(activeSplit)},
    [activeSplit]
  );

  // const selectionFunctions = {
  //  'colourCell',
  //  'clearCell',
  //  'splitCell',
  // };

    return (
      <Table
        className={ className }
        bordered
        variant="dark"
        style={{
          'tableLayout': 'fixed',
          'justifyContent': 'center',
        }}
      >
        <thead>
          <tr>
            <th colSpan='2'>
              Toolbar
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <ColourSelect
                unitList={ units }
                colourList={ unitColours }
                activeColour={ activeColour }
                setColour={ setColour }
              />
            </td>
            
            <td>
              <SplitSelect
                activeSplit={ selectedSplit }
                setSplit={ setSplit }
              />
            </td>
          </tr>
        </tbody>
        </Table>
    );
};

export default Toolbar;
