import React from 'react';
// import styles from './timeslot.module.css';

const availableColours = [
    'red',
    'aqua',
    'lime',
    'pink',
    'yellow',
    'purple'
];

const colourNameMap = {
    'red'       :'#ee2200',
    'aqua'      :'#22eeee',
    'lime'      :'#66dd00',
    'pink'      :'#ff77ff',
    'yellow'    :'#dddd22',
    'purple'    :'#ee22ee',
};

const Timeslot = ({ className, allocation=[] }) => {
    const colour = allocation.length > 0 ?
        colourNameMap[availableColours[allocation[0]]] :
        '';

    return (
        <td style={{'backgroundColor': colour}}>
        </td>
    );
};

export default Timeslot;
