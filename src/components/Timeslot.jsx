import React, { useState, useEffect } from 'react';

const Timeslot = ({
    className,
    allocationIndex,
    allocateTimeslot=(_)=>null,
    unitColours,
    unitList,
    content,
    activeColour,
    colSpan='1'
}) => {
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

    const [selectedColour, setSelectedColour] = useState(activeColour);

    useEffect(
        () => {setSelectedColour(activeColour)},
        [activeColour]
    );

    // cycle through colours on click
    const onClick = () => {
        allocateTimeslot(unitColours.indexOf(activeColour));
        // const newVal = (unitIndex + 1) % coloursList.length;
        // allocateTimeslot(newVal);
    }

    // clear colou*r on double click
    const onDoubleClick = () => {
        allocateTimeslot(-1);
    }

    const hexOpacityStr = '44';

    const style = {
        'backgroundColor' : colour ? (colour + hexOpacityStr) : '#212529',
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
