import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import CommentController from "../controllers/commentController.js";

const router = new Router()

router.post('/create',authMiddleware,CommentController.createComment) // necessary task.taskId for Task.comments and parentId for Commetn.subcomments
router.get('/get/:taskId',authMiddleware,CommentController.getComment)
router.get('/getAllComments',authMiddleware,CommentController.getAllComment)
router.get('/getsubcomments/:parentId',authMiddleware,CommentController.getSubComment)

export default router