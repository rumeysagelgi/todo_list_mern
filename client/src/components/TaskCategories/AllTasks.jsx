import React, { useContext } from 'react';
import Task from '../Task';
import TaskContext from '../../context/TaskContext';

function AllTasks() {
    const { tasks, editMode, taskToEdit } = useContext(TaskContext);
    
    // Logging context values for debugging purposes
    console.log('Tasks:', tasks);
    console.log('EditMode:', editMode);
    console.log('TaskToEdit:', taskToEdit);
    
    return (
        <div>
            {(
                tasks && Object.keys(tasks).length !== 0 ? (
                    Object.keys(tasks).map((taskId) => (
                        <Task key={taskId} task={tasks[taskId]} id={taskId} />
                    ))
                ) : (
                    <h1 className="text-gray-200 text-lg italic">No tasks found</h1>
                )
            )}
        </div>
    );
}

export default AllTasks;