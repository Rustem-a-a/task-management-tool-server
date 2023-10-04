import User from '../models/userModel.js'
import Role from "../models/roleModel.js";
import bcrypt from 'bcryptjs'
import {validationResult} from "express-validator";
import UserDto from '../dtos/userDto.js'
import TokenService from "../service/tokenService.js";
import UserService from "../service/userService.js";

class AuthControllers {
    async registration(req, res,next) {
        const errors = validationResult(req)

        try {
           const {username, email,password} = req.body
           const userData = await UserService.registration({username, email, password})
           res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
           return res.status(200).json({userData})
        } catch (e) {
            next(e)
        }
    }

    async activate(req,res,next){
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return  res.redirect(process.env.CLIENT_URL)

        }catch (e){
            next(e)
        }

    }

}

export default new AuthControllers()