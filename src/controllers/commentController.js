import CommentService from "../service/commentService.js";
import CommentModel from "../models/commentModel.js";

class CommentControllers {
    async createComment(req, res, next) {
        try {
            console.log(33333)
            const comment = await CommentService.createComment(req.body)
            return res.status(200).json(comment);
        } catch (e) {
            next(e)
        }
    }
    async getComment(req, res, next) {
        try {
            const {taskId} = req.params
            const comments = await CommentService.getComment(taskId)
            return res.status(200).json(comments);
        } catch (e) {
            next(e)
        }
    }
    async getSubComment(req, res, next) {
        try {
            const {parentId} = req.params
            console.log(parentId)
            const comments = await CommentService.getAllSubComments(parentId)
            return res.status(200).json(comments);
        } catch (e) {
            next(e)
        }
    }

    async getAllComment(req, res, next) {
        try {
            const comments = await CommentModel.find()
            return res.status(200).json(comments);
        } catch (e) {
            next(e)
        }
    }
}

export default new CommentControllers()