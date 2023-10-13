import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ссылка на модель пользователя, если комментарии привязаны к пользователям
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
    ]

})

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;