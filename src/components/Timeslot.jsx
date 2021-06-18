import React, { useState } from 'react';
// import styles from './timeslot.module.css';

import { availableColours, colourNameMap } from './colours';

const Timeslot = ({ className, day, time, allocation=[], allocations }) => {
    const [alloc, setAlloc] = useState(allocation);

    const colour = alloc.length > 0 ?
        colourNameMap[availableColours[alloc[0]]] :
        '';

    const onClick = () => {
        const curr = allocations[day][time] !== undefined ? allocations[day][time] : 0;

        allocations[day][time] = (curr + 1) % availableColours.length;
        setAlloc([allocations[day][time]]);
    }

    return (
        <td style={{'backgroundColor': colour}} onClick={ onClick }>
        </td>
    );
};

export default Timeslot;
