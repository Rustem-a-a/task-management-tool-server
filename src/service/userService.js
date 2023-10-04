import User from '../models/userModel.js'
import {v4}  from 'uuid'
import bcrypt from 'bcryptjs'
import TokenService from "../service/tokenService.js";
import MailService from "../service/mailService.js";
import UserDto from "../dtos/userDto.js";

class UserService{
    async registration ({username, email, password}){
        const candidate = await User.findOne({$or:[{username}, {email}]})
        if (candidate) {
            throw new Error( `User with name ${username} or ${email} with  has existed`);
        }
        const hashPassword = await bcrypt.hash(password,7);
        const activationLink = await v4();
        const user = await User.create({username,email,password:hashPassword,activationLink});
        await MailService.sendActivationMail(email,`${process.env.SERVER_URL}/auth/activate/${activationLink}`);
        const userDto = new UserDto(user);
        console.log(userDto)
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id,tokens.refreshToken);
        console.log(tokens)
        return {...tokens, user:userDto}
    }

    async activate(activationLink){
        try {
            const user = await User.findOne({activationLink})
            if(!user){
                throw new Error('Incorrect activation link')
            }
            user.isActivated = true
            await user.save()
        }catch (e){
            console.log(e)}

    }
}

export default new UserService()