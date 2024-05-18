function taskReducer(tasks, action) {

    console.log("taskreducer");
    
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    _id: action._id,
                    title: action.title,
                    description: action.description,
                    completed: false
                }
            ]
        }
        case "SET_TASK": {
            return action.payload
        }
        case "REMOVE_TASK": {
            console.log("Tasks before removal:", tasks);
            const updatedTasks = tasks.filter((task) => task._id !== action._id);
            console.log("Tasks after removal:", updatedTasks);
            return updatedTasks;
        }
        case "MARK_DONE": {
            return tasks.map((task) => {
                if (task._id === action._id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task
            })
        }
        case "EDIT_TASK": {
            const { taskToEdit, title, description } = action;
        
            // Ensure taskToEdit exists within tasks object
            if (tasks && tasks.taskToEdit) {
                const updatedTask = {
                    ...tasks.taskToEdit,
                    title,
                    description
                };
        
                // Return a new object maintaining the original structure
                return {
                    ...tasks,
                    taskToEdit: {
                        ...tasks.taskToEdit,
                        title,
                        description
                    },
                    [taskToEdit]: updatedTask // Update the specific task in the tasks object
                };
            }
        
            return tasks; // Return original state if tasks or taskToEdit is missing
        }
        case 'SET_EDIT_MODE': {
            console.log('Processing SET_EDIT_MODE:', action.payload);
            return {
                ...tasks,
                taskToEdit: action.payload, // Set the task for editing
                editMode: true // Set edit mode to true
            };
        }
        case "CLEAR_EDIT_MODE": {
            console.log('Processing CLEAR_EDIT_MODE');
            return {
                ...tasks,
                editMode: false
            };
        }
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}

export default taskReducer;