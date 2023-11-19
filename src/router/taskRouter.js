import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import TaskController from "../controllers/TaskController.js";

const router = new Router()

router.post('/create',authMiddleware,TaskController.createTask)
router.patch('/edit',authMiddleware, TaskController.editTask);
router.delete('/delete/:projectId/:parentId/:taskId',authMiddleware, TaskController.deleteTask);
router.get('/get/:projectId',authMiddleware, TaskController.getProjectTasks);
router.get('/getsubtask/:taskId',authMiddleware, TaskController.getSubtasks);
export default router