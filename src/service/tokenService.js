import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '60d'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '60d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        return await Token.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken) {
        const removedToken = await Token.deleteOne({refreshToken});
        return removedToken;
    }

     validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();