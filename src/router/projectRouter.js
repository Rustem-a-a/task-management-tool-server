import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ProjectController from "../controllers/projectController.js";

const router = new Router()

router.post('/create',authMiddleware,ProjectController.createProject)
router.patch('/edit',authMiddleware, ProjectController.editProject);
router.delete('/delete/:id',authMiddleware, ProjectController.deleteProject);
router.get('/get',authMiddleware, ProjectController.getProjects);
export default router