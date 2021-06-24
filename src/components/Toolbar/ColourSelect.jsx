import React, { useState, useEffect } from 'react';

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
        <></>
    );
};

export default ColourSelect;
