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
    ]
})

const Project = mongoose.model('Project', projectSchema)
export default Project