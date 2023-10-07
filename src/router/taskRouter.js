import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import TaskController from "../controllers/TaskController.js";

const router = new Router()

router.post('/create',authMiddleware,TaskController.createTask)
router.patch('/edit',authMiddleware, TaskController.editTask);
router.delete('/delete/:id',authMiddleware, TaskController.deleteTask);
router.get('/get',authMiddleware, TaskController.getTasks);
export default router