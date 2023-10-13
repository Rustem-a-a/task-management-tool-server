import CommentService from "../service/commentService.js";

class CommentControllers {
    async createComment(req, res, next) {
        try {
            const comment = await CommentService.createComment(req.body)
            return res.status(200).json(comment);
        } catch (e) {
            next(e)
        }
    }
}

export default new CommentControllers()