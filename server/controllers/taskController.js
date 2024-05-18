import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Back-end function for adding a task
const addTask = async (req, res) => {
    const { _id, title, description } = req.body;
    const userId = req.user.id;

    const user = await userModel.find({_id: userId});
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const taskId = _id ? mongoose.Types.ObjectId(_id) : new mongoose.Types.ObjectId();

    console.log("Task to be saved:", { taskId, title, description, completed: false, userId });

    const newTask = new taskModel({ _id: taskId, title, description, completed: false, userId })

    newTask.save()
        .then((savedTask) => {
            return (res.status(200).json({ message: "Task added successfully", task: savedTask }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}

// Back-end function for deleting a task
const removeTask = (req, res) => {
    const { _id } = req.query;

    console.log("Task ID to remove:", _id); // Log the ID being used for deletion

    taskModel.findByIdAndDelete( _id )
        .then((deletedTask) => {
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            console.log("Deleted task:", deletedTask); // Log the deleted task
            return res.status(200).json({ message: "Task deleted successfully" });
        })
        .catch((error) => {
            console.error("Error deleting task:", error); // Log any errors
            return res.status(500).json({ message: "Internal server error" });
        });
}

// Back-end function for getting task info
const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}

// Back-end function for marking a task as "done"
const updateTaskStatus = async (req, res) => {
    const { _id, completed } = req.body;

    try {
        // Find the task by _id and update the completed field
        const updatedTask = await taskModel.findByIdAndUpdate(_id, { completed }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask); // Return the updated task
    } catch (error) {
        console.error("Error updating task completion:", error);
        res.status(500).json({ message: "Failed to update task completion status" });
    }
};

// Back-end function for updating a task
const editTask = async (req, res) => {
    const _id = req.params._id;
    const { title, description } = req.body;

    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            _id,
            { title, description },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task edited successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { addTask, getTask, removeTask, updateTaskStatus, editTask }
