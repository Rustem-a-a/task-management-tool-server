import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import TaskController from "../controllers/TaskController.js";

const router = new Router()

router.post('/create',authMiddleware,TaskController.createTask) // necessary task.rojectId for Project.tasks and parentId for Task.subtasks
router.patch('/edit',authMiddleware, TaskController.editTask);
router.delete('/delete/:projectId/:parentId/:taskId',authMiddleware, TaskController.deleteTask);
router.get('/get/:projectId',authMiddleware, TaskController.getProjectTasks);
export default router