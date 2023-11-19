import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    start: {
        type: Date,
        default: Date.now(),
        required: true
    },
    finish: {
        type: Date,
        default: Date.now(),
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now(),
        required: true
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
