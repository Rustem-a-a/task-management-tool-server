import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";
import mpath from "mongoose-mpath";

class CommentService{
async createComment (comment){

    if(comment.parentId){
        console.log(comment.parentId)
        console.log(111111)
        const newComment = await Comment.create({...comment,author:comment.user.username,child:true,parentId:comment.parentId})
        console.log(22222)
        await Comment.updateOne({ _id: comment.parentId}, { $push: { subcomments: newComment._id} })
        console.log(33333)
        return newComment
    }
    if(!comment.parentId){
        console.log(comment.user)
        const newComment = await Comment.create({...comment,author:comment.user.username})
        await Task.updateOne({ _id: comment.taskId}, { $push: { comments: newComment._id } })
        return newComment
    }
}

    async getComment (taskId){
        const comments = await Task.findOne({_id:taskId}).select(['-_id','comments']).populate('comments')
        const allSubComments = await Promise.all(comments.comments.map(comFirst=>this.getAllSubComments(comFirst._id)))
        return allSubComments
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

    // async getAllSubComments (parentId){
    // const comment = await Comment.findOne({_id:parentId});
    //         if (!comment) {
    //             return null;
    //         }
    //         if (comment.subcomments && comment.subcomments.length > 0) {
    //             console.log(comment.subcomments)
    //             const subcommentsPromises = comment.subcomments.map((subcommentId) =>{
    //                return  this.getAllSubComments(subcommentId)
    //             });
    //             const subcomments = await Promise.all(subcommentsPromises);
    //             console.log(subcomments)
    //             comment.subcomments = subcomments;
    //         }
    //         return comment;
    //     };


    // async getComment (taskId){
    //     const comments = await Task.findOne({_id:taskId}).select(['-_id','comments']).populate('comments')
    //     return comments.comments
    //     }


    // async getSubComment (parentId){
    //     const comments = await Comment.findOne({_id:parentId}).select(['-_id','subcomments']).populate('subcomments')
    //     return comments.subcomments
    // }
}
export default new CommentService()