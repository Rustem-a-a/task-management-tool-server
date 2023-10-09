import mongoose from "mongoose";
import Task from './taskModel.js'
import User from "./userModel.js";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true},
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }
})

const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;
