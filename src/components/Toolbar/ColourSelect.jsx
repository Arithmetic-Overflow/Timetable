import React, { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ColourSelect = ({ className, isSelected, unitList, colourList }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(
    () => {setSelected(isSelected)},
    [isSelected]
  );

  const [units, setUnits] = useState(unitList);
  const [unitColours, setUnitColours] = useState(colourList);


  const getSelections = () => {
    return (
      units.map(
        (unit, colourIndex) =>
          [unit, unitColours[colourIndex]]
      )
    );
  }

  const [selections, setSelections] = useState(getSelections());

  useEffect(
    () => {
    	setUnits(unitList);
    	setUnitColours(colourList);
    	setSelections(getSelections());
    },
    [unitList, colourList]
  );

    return (
				<DropdownButton
					title='Select Colour'
					variant='secondary'
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
                    style={{
                    	'backgroundColor': colour
                    }}
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
