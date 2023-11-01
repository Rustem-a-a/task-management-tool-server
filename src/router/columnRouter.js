import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ColumnController from "../controllers/columnController.js";

const router = new Router()

router.patch('/edit',authMiddleware, ColumnController.editColumn);
router.patch('/addnewtask',authMiddleware, ColumnController.addNewTask);

export default router