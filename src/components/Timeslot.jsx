import React, { useState, useEffect } from 'react';

const Timeslot = ({ className, allocationIndex, allocateTimeslot=(_)=>null, unitColours, unitList, content, colSpan='1' }) => {
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

    // clear colou*r on double click
    const onDoubleClick = () => {
        allocateTimeslot(-1);
    }

    const hexOpacityStr = '44';

    const style = {
        'backgroundColor' : colour + hexOpacityStr,
        'borderRadius' : '14px',
        'borderColor' : colour ? colour : 'transparent',
        'borderStyle' : 'double',
        'borderWidth': '5px'
    }

    return (
        <td
            className={ className + ' timeslot' }
            style={ style }
            onClick={ onClick }
            onDoubleClick={ onDoubleClick }
            colSpan={ colSpan }
        >
            { content ? content : '' }
        </td>
    );
};

export default Timeslot;
