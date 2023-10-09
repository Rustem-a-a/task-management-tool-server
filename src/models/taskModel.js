import mongoose from "mongoose";
import ApiError from "../exceptions/apiError.js";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: 'Title'
    },
    description: {
        type: String,
        required: true,
        default: 'Description'

    },
    start: {
        type: Date,
        default: Date.now(),
        required: true
    },
    workTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now(),
        required: true
    },
    priority: {
        type: String,
        required: true,
        default: '1'
    },
    attachments: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'Queue'
    },
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;