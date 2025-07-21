import { Request,Response,NextFunction } from "express";
import { ValidationException } from "../exceptions";
import { HTTP_STATUS } from "../constants/http-status.constant";
import JwtHelper from "../helpers/jwt.helper";

const jwthelper= new JwtHelper()

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: any;
    }
  }
}

async function checkToken(
    req:Request,
    res:Response,
    next:NextFunction

){ try{

    const token = req.headers['authorization']??req.headers.authorization

    if(!token){
        throw new ValidationException(
            HTTP_STATUS.VALIDATION_ERROR.CODE,
            'Token is invalid'
        )
    }
    const checkBearer=typeof token==='string'&& token.startsWith('Bearer')

    const isBearer= checkBearer ? token.split(' ')[1] : token

    const sendToCheck = await jwthelper.verifyAccessToken(isBearer)

    if(!sendToCheck){
        throw new ValidationException(
            HTTP_STATUS.VALIDATION_ERROR.CODE,
            `The decoded payload is empty`
        )
    }

    req.user= sendToCheck
    req.token= token 
}
catch(err){
    next(err)
}

    
    
}

export {checkToken}