import React, { useContext } from 'react';
import Task from '../Task';
import TaskContext from '../../context/TaskContext';

function Processing() {
    const { tasks } = useContext(TaskContext);

    return (
        <div>
            {(
                tasks && Object.keys(tasks).length !== 0 ? (
                    <div>
                        {Object.keys(tasks).map((taskId) => {
                            const task = tasks[taskId];
                            if (!task.completed) {
                                return <Task key={taskId} task={task} id={taskId} />;
                            }
                            return null; // Skip rendering completed tasks
                        })}
                    </div>
                ) : (
                    <h1 className="text-gray-200 text-lg italic">No tasks found</h1>
                )
            )}
        </div>
    );
}

export default Processing;