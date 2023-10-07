import User from '../models/userModel.js'
import {validationResult} from "express-validator";
import UserDto from '../dtos/userDto.js'
import TokenService from "../service/tokenService.js";
import UserService from "../service/userService.js";
import ApiError from "../exceptions/apiError.js";
import userService from "../service/userService.js";

class AuthControllers {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', errors.array()));
        }
        try {
            const {username, email, password} = req.body;
            const userData = await UserService.registration({username, email, password});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json({...userData});
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await userService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json({...userData});
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const removedToken = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(removedToken);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken)
            const userDataFromToken = await TokenService.validateRefreshToken(refreshToken);
            console.log(userDataFromToken)
            const foundToken = await TokenService.findToken(refreshToken);
            if (!userDataFromToken || !foundToken){
                return res.status(401).json({message: 'Error of authContollers of refresh'});
            }
            const user = await User.findOne({_id: userDataFromToken.id});
            const userDto = new UserDto(user);
            const tokens = TokenService.generateToken({...userDto});
            await TokenService.saveToken(userDto.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(
                {
                    user: userDto,
                    ...tokens
                })
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);

        }
    }
}

export default new AuthControllers();