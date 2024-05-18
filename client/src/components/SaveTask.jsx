import React, { useState, useEffect, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TokenContext from '../context/TokenContext';
import axios from '../axios/axios';

function SaveTask() {
    const { tasks, dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const { editMode, taskToEdit } = tasks; // Extract editMode and taskToEdit from context

    useEffect(() => {
        // Populate form fields with task details when in editMode
        if (editMode && taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle(""); // Reset title when not editing
            setDescription(""); // Reset description when not editing
        }
    }, [editMode, taskToEdit]);

    // Front-end event handler for adding or updating a task
    const handleAddOrEdit = async (e) => {
        e.preventDefault();

        try {
            if (editMode && taskToEdit) {
                // Update existing task
                const res = await axios.post(`/task/editTask/${taskToEdit._id}`, { title, description }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                console.log("Task edited:", res.data);
                // Update task in context
                dispatch({
                    type: 'EDIT_TASK',
                    _id: taskToEdit._id,
                    title: res.data.task.title,
                    description: res.data.task.description
                });

                dispatch({ type: 'CLEAR_EDIT_MODE' }); // Clear edit mode after submission
                window.location.reload(); // Reload the page
            } else {
                // Add new task
                const res = await axios.post("/task/addTask", { title, description }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                console.log("New task added:", res.data);
                // Add new task to context
                dispatch({
                    type: "ADD_TASK",
                    _id: res.data.task._id,
                    title: res.data.task.title,
                    description: res.data.task.description,
                });
            }
            // Reset form fields
            setTitle("");
            setDescription("");

        } catch (error) {
            console.log(error);
        }
    };

    // Form for adding or updating a task
    return (
        <div className="addContainer md:w-1/3 md:mx-24 mx-3 mt-3 text-lg flex justify-center">
            <div className="w-11/12">
                <form onSubmit={handleAddOrEdit}>
                    <div>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            placeholder="Title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-neutral-600 border-solid border-2 border-black text-white rounded-lg outline-none block w-full p-2.5 mt-5 capitalize"
                        />
                    </div>
                    <div className="my-3">
                        <textarea
                            rows={8}
                            name="description"
                            id="description"
                            value={description}
                            placeholder="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className="bg-neutral-600 border-solid border-2 border-black text-white rounded-lg outline-none block w-full p-2.5 mt-7"
                        />
                    </div>
                    <div className="flex justify-center">
                        
                        <button type='submit' className="mt-3 mb-7">
                            <div className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                <span className="relative text-white">{editMode ? "Save to To-Do List" : "Add to To-Do List"}</span>
                            </div>
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SaveTask;