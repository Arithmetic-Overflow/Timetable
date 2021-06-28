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
    return (
      unitList.map(
        (unit, colourIndex) =>
          [unit, colourList[colourIndex]]
      )
    );
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
			>
        {
        	selections.map(
        		(selection) => {
        			const unitName 		= selection[0];
        			const colour 			= selection[1];

              const hexOpacityStr = '44';

              const style = {
                'backgroundColor' : colour + hexOpacityStr,
                'borderColour' : colour,
                'borderStyle' : 'double',
                'borderWidth' : '4px',
                'borderRadius' : '12px',
                'margin' : '4px auto'
              }

        			return (
        				<Dropdown.Item
                  eventKey={ selection[0] } 
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
