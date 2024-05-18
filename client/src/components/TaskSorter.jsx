import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskSorter() {
    return ( 
        <div className='flex-grow'>
            <nav>
                <ul className='flex gap-3 text-lg justify-between p-3'>
                    <li>
                        <NavLink to="/">All Tasks</NavLink>
                    </li>
                    <li>
                        <NavLink to="/processing">Processing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/done">Done</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default TaskSorter;