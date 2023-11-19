import User from '../models/userModel.js'
import {v4}  from 'uuid'
import bcrypt from 'bcryptjs'
import TokenService from "../service/tokenService.js";
import MailService from "../service/mailService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiError.js";
import tokenService from "../service/tokenService.js";

class UserService{
    async registration ({username, email, password}){
        const candidate = await User.findOne({$or:[{username}, {email}]});
        if (candidate) {
            throw ApiError.BadRequest( `User with name ${username} or ${email} with  has existed`);
        }
        const hashPassword = await bcrypt.hash(password,7);
        const activationLink = await v4();
        const user = await User.create({username,email,password:hashPassword,activationLink});
        await MailService.sendActivationMail(email,`${process.env.SERVER_URL}/auth/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id,tokens.refreshToken);
        return {...tokens, user:userDto}
    }

    async activate(activationLink){
            const user = await User.findOne({activationLink});
            if(!user){
                throw ApiError.BadRequest('Incorrect activation link');
            }
            user.isActivated = true;
            await user.save();
    }

    async login(username,password){
            const user = await User.findOne({username});
            if (!user) {
                throw ApiError.BadRequest(`User with name ${username} not found`);
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw ApiError.BadRequest('Password incorrect');
            }
            const userDto = new UserDto(user);
            const tokens = TokenService.generateToken({...userDto});
            await TokenService.saveToken(userDto.id,tokens.refreshToken);
            return {...tokens,user:userDto};
    }

    async logout(refreshToken){
        const removedToken = await tokenService.removeToken(refreshToken);
        return removedToken;
    }
    async refresh (refreshToken){
        if(!refreshToken){
            throw ApiError.Unauthorized();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenDatabase = await tokenService.findToken(refreshToken);
        if(!userData || !tokenDatabase){
            throw ApiError.Unauthorized()
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id,tokens.refreshToken);
        return {...tokens,user:userDto}
    }

    async getAllUsers (){
    const users = await User.find();
        return users;
    }
}

export default new UserService();