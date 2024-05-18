import React from 'react';
import TaskSorter from './TaskSorter';
import SaveTask from './SaveTask';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <SaveTask />
                <div className='task-container mx-5 md:mx-24 md:w-1/3 mt-3'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='taskSorter'>
                        <TaskSorter />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Layout;