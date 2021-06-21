import React, { useState, useEffect } from 'react';
import { availableColours, colourNameMap } from './colours';

const Timeslot = ({ className, allocation, allocateTimeslot }) => {
    const getColour = allocation => colourNameMap[availableColours[allocation]];
    const [colour, setColour] = useState(getColour(allocation));

    useEffect(() => {
            setColour(getColour(allocation));
        },
        [allocation]
    );

    const onClick = () => {
        const newVal = (allocation + 1) % availableColours.length;
        allocateTimeslot(newVal);
    }

    return (
        <td style={{'backgroundColor': colour}} onClick={ onClick } />
    );
};

export default Timeslot;
