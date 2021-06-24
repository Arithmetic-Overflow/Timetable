import React, { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ColourSelect = ({ className, isSelected, unitList, colourList }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(
    () => {setSelected(isSelected)},
    [isSelected]
  );

  const getSelections = () => {
    return (
      unitList.map(
        (unit, colourIndex) =>
          [unit, colourList[colourIndex]]
      )
    );
  }

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

        			return (
        				<Dropdown.Item
                  eventKey={ selection[0] } 
                  key={ selection[0] }
                  style={{'backgroundColor': colour}}
                  className='colourSelectItem'
          			>
            			{unitName}
            		</Dropdown.Item>
        			);
        		}
        	)
        }
			</DropdownButton>
  );
};

export default ColourSelect;
