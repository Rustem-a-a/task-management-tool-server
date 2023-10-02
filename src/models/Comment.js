import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment