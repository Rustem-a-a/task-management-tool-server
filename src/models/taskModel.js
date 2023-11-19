import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: 'Title'
    },
    description: {
        type: String,
        default: 'Description'

    },
    child:{
        type:Boolean,
        default:false
    },
    start: {
        type: Date,
        default: Date.now(),
    },
    workTime: {
        type: Date,
        default: Date.now(),
    },
    deadline: {
        type: Date,
        default: Date.now(),
        // required: true
    },
    priority: {
        type: String,
        // required: true,
        default: '1'
    },
    attachments: [{
        type: String
    }],
    status: {
        type: String,
        // required: true,
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
            ref: 'Comment'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;