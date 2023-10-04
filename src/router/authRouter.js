import Router from "express";
import {body} from "express-validator";
import authControllers from "../controllers/authController.js";
import authController from "../controllers/authController.js";
const router = new Router()
router.post('/registration', authController.registration)

router.post('/login', authControllers.login)

router.get('/logout', authControllers.logout)

router.get('/refresh',authControllers.refresh)

router.get('/activate/:link', authControllers.activate)

router.get('/users',authControllers.getUsers)
// router.get('/users',authMiddleware, authControllers.getUsers)

export default router