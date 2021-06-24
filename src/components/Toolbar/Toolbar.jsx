import React, { useState, useEffect } from 'react';

import ColourSelect from './ColourSelect';
import SplitSelect from './SplitSelect';

const Toolbar = ({ className, currentSelection, unitList, colourList }) => {
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
	        />
	        <SplitSelect />
        </>
    );
};

export default Toolbar;
