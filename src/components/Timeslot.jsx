import React, { useState } from 'react';
import { availableColours, colourNameMap } from './colours';

const Timeslot = ({ className, day, time, allocations, setAllocations }) => {
    const originalColour = colourNameMap[availableColours[allocations[day][time]]];
    const [colour, setColour] = useState(originalColour);

    const onClick = () => {
        const curr = allocations[day][time] !== undefined ? allocations[day][time] : 0;

        const newAllocations = allocations;
        newAllocations[day][time] = (curr + 1) % availableColours.length;
        setAllocations(newAllocations);
        setColour(colourNameMap[availableColours[allocations[day][time]]]);
    }

    return (
        <td style={{'backgroundColor': colour}} onClick={ onClick } />
    );
};

export default Timeslot;
