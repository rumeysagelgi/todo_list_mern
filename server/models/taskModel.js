import mongoose from "mongoose";

const taskInstance = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps:true }, { _id:true });

const taskModel = mongoose.model("Task", taskInstance);

export default taskModel;