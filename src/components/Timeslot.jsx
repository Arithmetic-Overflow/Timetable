import React, { useState, useEffect } from 'react';

const Timeslot = ({ className, allocationIndex, allocateTimeslot, unitColours, unitList }) => {
    const [coloursList, setColoursList] = useState(unitColours);

    const [unitIndex, setUnitIndex] = useState(allocationIndex);

    const [colour, setColour] = useState(coloursList[allocationIndex]);

    useEffect(
        () => {
            setColoursList(unitColours)
            setUnitIndex(allocationIndex);
            setColour(unitColours[allocationIndex]);
        },
        [allocationIndex, unitColours]
    );

    // cycle through colours on click
    const onClick = () => {
        const newVal = (unitIndex + 1) % coloursList.length;
        allocateTimeslot(newVal);
    }

    // clear colour on double click
    const onDoubleClick = () => {
        allocateTimeslot(-1);
    }

    const style = {
        'backgroundColor' : colour,
        'borderRadius' : '16px'
    }

    return (
        <td style={style} onClick={ onClick } onDoubleClick={ onDoubleClick } />
    );
};

export default Timeslot;
