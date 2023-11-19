import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";

class CommentService{
async createComment (comment){
    if(comment.parentId){
        const newComment = await Comment.create({...comment,author:comment.user.username,child:true,parentId:comment.parentId, taskId: comment.taskId,projectId:comment.projectId});
        await Comment.updateOne({ _id: comment.parentId}, { $push: { subcomments: newComment._id} });
        return newComment;
    }
    if(!comment.parentId){
        const newComment = await Comment.create({...comment,author:comment.user.username,taskId: comment.taskId,projectId:comment.projectId});
        await Task.updateOne({ _id: comment.taskId}, { $push: { comments: newComment._id } });
        return newComment;
    }
}

    async getComment (taskId){
        const comments = await Task.findOne({_id:taskId}).select(['-_id','comments']).populate('comments');
        const allSubComments = await Promise.all(comments.comments.map(comFirst=>this.getAllSubComments(comFirst._id)));
        return allSubComments;
    }
    async getAllSubComments (parentId){
        const comment = await Comment.findOne({_id:parentId}).populate('subcomments');
        if (!comment) {
            return null;
        }
        if (comment.subcomments && comment.subcomments.length > 0) {
           const subcommentsPromises = comment.subcomments.map((subcomment) =>this.getAllSubComments(subcomment._id));
           const subcomments = await Promise.all(subcommentsPromises);
           comment.subcomments = subcomments;
        }
        return comment;
    };
}
export default new CommentService()