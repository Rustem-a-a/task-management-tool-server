import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";
class CommentService{
async createComment (comment){
    const newComment = await Comment.create({...comment,author:comment.user.id})
    await Task.updateOne({ _id: comment.taskId}, { $push: { comments: newComment._id } })
    if(comment.parentId){
        await Comment.updateOne({ _id: comment.parentId}, { $push: { subcomments: newComment._id } })
    }
    return newComment
}
}
export default new CommentService()