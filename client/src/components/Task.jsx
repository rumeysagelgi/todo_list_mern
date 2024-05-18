import React, { useContext } from 'react';
import moment from 'moment';
import '../styles/task.css';
import axios from '../axios/axios.js';
import TaskContext from '../context/TaskContext.js';
import TokenContext from '../context/TokenContext.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Task({ task }) {
    const { _id } = task;
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);

    // Front-end event handler for deleting a task
    const handleRemove = async (e) => {
        e.preventDefault();
        console.log("Task ID to remove:", _id);
    
        try {
            const res = await axios.get("/task/removeTask", {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                params: {
                    _id
                }
            });
            console.log("Task deletion response:", res.data);
            dispatch({
                type: "REMOVE_TASK",
                _id
            });
        } catch (error) {
            console.error("Error removing task:", error);
            // Handle error state or display an error message to the user
        }
    }
    
    // Front-end event handler for marking a task as "done"
    const handleMarkDone = async () => {
        try {
            const res = await axios.post('/task/updateTaskStatus', {
                _id: task._id,
                completed: !task.completed // Toggle completion status
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}` // Include JWT token in headers
                }
            }
        );
            console.log('Task completion status successfully updated:', res.data);
            dispatch({
                type: 'MARK_DONE',
                _id: task._id
            });
        } catch (error) {
            console.error('Error updating task:', error);
            // Handle error state or display an error message to the user
        }
    };

    // Front-end event handler for editing a task
    const handleEdit = () => {
        console.log('Editing task:', { task }); // Log the task details being edited
        // Dispatch an action to set the task for editing
        console.log('Dispatching SET_EDIT_MODE with task:', task);
        dispatch({
            type: 'SET_EDIT_MODE',
            payload: task // Send the entire task object for editing
        });
    };

    return (
        <div className="bg-rose-100 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 mb-3">
            <div className="mark-done">
                <input type="checkbox" className="checkbox ml-2 accent-zinc-600" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-zinc-900 w-10/12">
                <h1 className="task-title text-lg font-medium capitalize">{task.title}</h1>
                <p className="task-description text-base">{task.description}</p>
                <div className="italic opacity-60 text-sm">
                    {
                        task?.updatedAt ? (
                            <p>Last updated {moment(task.updatedAt).fromNow()}</p>
                        ) : (
                            <p>Last updated just now</p>
                        )
                    }
                </div>
            </div>
            <div className="text-zinc-800">
                    <EditIcon style={{ fontSize: 20, cursor: "pointer" }} className="mb-3" onClick={handleEdit} />
                    <DeleteIcon style={{ fontSize: 20, cursor: "pointer" }} onClick={handleRemove} />
            </div>
        </div>
    );
}

export default Task;