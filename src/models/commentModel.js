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

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;