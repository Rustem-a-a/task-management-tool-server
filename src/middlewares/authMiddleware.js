import ApiError from "../exceptions/apiError.js";
import tokenService from "../service/tokenService.js";

export default function (req, res,next) {
    try{
    const authorizationHeaders = req.headers.authorization;
    if(!authorizationHeaders){
        return next(ApiError.Unauthorized());
    }
    const accessToken = authorizationHeaders.split(' ')[1]
    if(!accessToken){
        return next(ApiError.Unauthorized());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if(!userData){
        return next(ApiError.Unauthorized());
        }
    req.body.user = userData;
    next();
    }catch (e) {
       return  ApiError.Unauthorized()
    }
}
