import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '2h'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await tokenData.save()
        }
        return await Token.create({user: userId, refreshToken})
    }
}

export default new TokenService()