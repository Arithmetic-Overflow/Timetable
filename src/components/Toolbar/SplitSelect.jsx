import React, { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SplitSelect = ({ className, isSelected }) => {
    const [selected, setSelected] = useState(isSelected);

    useEffect(
        () => {setSelected(isSelected)},
        [isSelected]
    );
    
    const possibleSplits = [1, 2, 3, 4];
    const fractions = [
        <>1</>,
        <>&#xBD;</>,
        <>&#x2153;</>,
        <>&#xBC; </>,
    ]

    const getFrac = denominator =>
        <>&frac1{denominator};</>

    const dropdownStyle = {
      'borderColor' : 'white',
      'borderStyle' : 'double',
      'borderWidth' : '4px',
      'borderRadius' : '12px',
      'margin' : '4px auto'
    }

    return (
        <DropdownButton
          title='Split'
          variant='outline-neon'
        >
          {
            possibleSplits.map(
              (split, splitIndex) =>
                <Dropdown.Item
                  eventKey={ split } 
                  key={ split }
                  style={ dropdownStyle }
                >
                  {fractions[splitIndex]}
                </Dropdown.Item>
            )
          }
        </DropdownButton>
    );
};

export default SplitSelect;
