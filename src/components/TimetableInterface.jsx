import React from 'react';
import Timetable from './Timetable'
import Legend from './Legend'

const TimetableInterface = ({ className }) => {
    return (
    	<div>
	    	<Legend />
	        <Timetable timeStandard='24' />
        </div>
    );
};

export default TimetableInterface;
