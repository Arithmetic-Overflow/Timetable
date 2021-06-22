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

    const onClick = () => {
        const newVal = (unitIndex + 1) % coloursList.length;
        allocateTimeslot(newVal);
    }

    const onDoubleClick = () => {
        allocateTimeslot(-1);
    }

    return (
        <td style={{'backgroundColor': colour}} onClick={ onClick } onDoubleClick={ onDoubleClick } />
    );
};

export default Timeslot;
