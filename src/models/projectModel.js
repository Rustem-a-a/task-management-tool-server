import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        type:Date,
    },
    deadline: {
        type:Date,
        default: Date.now()
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ProjectModel = mongoose.model('Project', projectSchema)
export default ProjectModel