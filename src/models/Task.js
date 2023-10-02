import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    start: {
        type:Date,
        default: Date.now(),
        required: true
    },
    workTime: {
        type:Date,
        default: Date.now(),
        required: true
    },
    deadline: {
        type:Date,
        default: Date.now(),
        required: true
    },
    priority: {
        type: Boolean,
        required: true
    },
    attachments: {
        type:String
    },
    status: {
        type:String,
        required:true,
        default: 'Queue'
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Task = mongoose.model('Task', taskSchema)
export default Task