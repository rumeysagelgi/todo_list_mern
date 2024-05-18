import React, { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TaskDone from '../TaskDone';

function Done() {
    const { tasks } = useContext(TaskContext);

    return (
        <div>
            {(
                Object.keys(tasks).length !== 0 ? (
                    <div>
                        {tasks.map((task, taskId) => {
                            return task.completed && <TaskDone key={taskId} task={task} id={taskId} />;
                        })}
                    </div>
                ) : (
                    <h1 className="text-gray-200 text-lg italic">No tasks found</h1>
                )
            )}
        </div>
    );
}

export default Done;