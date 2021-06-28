import React, { useState, useEffect } from 'react';

import ColourSelect from './ColourSelect';
import SplitSelect from './SplitSelect';

const Toolbar = ({ className, currentSelection, unitList, colourList, setColour, activeColour }) => {
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

	// const selectionFunctions = {
	// 	'colourCell',
	// 	'clearCell',
	// 	'splitCell',
	// };

    return (
    	<>
	        <ColourSelect
	        	unitList={ units }
	        	colourList={ unitColours }
	        	activeColour={ activeColour }
	        	setColour={ setColour }
	        />
	        {/*<SplitSelect />*/}
        </>
    );
};

export default Toolbar;
