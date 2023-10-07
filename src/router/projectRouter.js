import Router from "express";
import {body} from "express-validator";
import authControllers from "../controllers/authController.js";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import ProjectController from "../controllers/projectController.js";

const router = new Router()

router.post('/createProject',authMiddleware,ProjectController.createProject)
router.patch('/editProject',authMiddleware, ProjectController.editProject);
router.delete('/deleteProject/:id',authMiddleware, ProjectController.deleteProject);
router.get('/getProjects',authMiddleware, ProjectController.getProjects);
export default router