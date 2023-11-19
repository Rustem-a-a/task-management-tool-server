import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subcomments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    child:{
        type:Boolean,
        default:false
    },
    parentId:{
        type:String
    },
    taskId: {
        type:String
    },
    projectId: {
        type:String
    }

})

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;