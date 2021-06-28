import React, { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ColourSelect = ({ className, isSelected, unitList, colourList, setColour, activeColour }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(
    () => {setSelected(isSelected)},
    [isSelected]
  );

  const [selectedColour, setSelectedColour] = useState(activeColour);

  useEffect(
    () => {setSelectedColour(activeColour)},
    [activeColour]
  );

  // get possible colour options
  const getSelections = () => {
    const noSelection = ['Delete', '#888888'];
    const allColours =
      unitList.map(
        (unit, colourIndex) =>
          [unit, colourList[colourIndex]]
      );

    return [noSelection, ...allColours];
  }

  // the possible options the user can select from
  const [selections, setSelections] = useState(getSelections());

  useEffect(
    () => {
    	setSelections(getSelections());
    },
    [unitList, colourList]
  );

  return (
			<DropdownButton
				title='Select Colour'
				variant='outline-neon'
        onSelect={ (event) => setColour(event) }
			>
        {
        	selections.map(
        		(selection) => {
        			const unitName 		= selection[0];
        			const colour 			= selection[1];

              const hexOpacityStr = '88';

              const style = {
                'backgroundColor' : colour + hexOpacityStr,
                'borderColor' : colour,
                'borderStyle' : 'double',
                'borderWidth' : '4px',
                'borderRadius' : '12px',
                'margin' : '4px auto'
              }

        			return (
        				<Dropdown.Item
                  eventKey={ colour } 
                  key={ selection[0] }
                  style={ style }
                  className='colourSelectItem'
          			>
            			{ unitName }
            		</Dropdown.Item>
        			);
        		}
        	)
        }
			</DropdownButton>
  );
};

export default ColourSelect;
