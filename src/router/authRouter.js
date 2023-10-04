import Router from "express";
import {body} from "express-validator";
import authControllers from "../controllers/authController.js";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router()

router.post('/registration',
    body('username').isLength({min:3,max:20}),
    body('email').isEmail(),
    body('password').isLength({min:5,max:20}),
    authController.registration)
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.get('/refresh',authControllers.refresh);
router.get('/activate/:link', authControllers.activate);
router.get('/users',authMiddleware, authControllers.getUsers);
export default router