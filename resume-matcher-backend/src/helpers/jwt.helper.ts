import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { IAuthPayload } from '../interface/auth.interface';
import { getEnvValue } from '../utils/env.utils';
import matcherLogger from '../libs/logger.libs';
import { ValidationException } from '../exceptions';
import { HTTP_STATUS } from '../constants/http-status.constant';

export default class JwtHelper{
    public accessToken:string
    public refreshToken:string

    constructor(){
        this.accessToken=getEnvValue('ACCESS_TOKEN') as string
        this.refreshToken=getEnvValue('REFRESH_TOKEN') as string
    }
    public async createAccessToken(payload:Partial<IAuthPayload>){
        try{
            const options={
                issuer:'FuckSubodhInAss',
                expiresIn:'1hr'
    
            } as jwt.SignOptions
    
    
            const accessToken= await jwt.sign(payload,this.accessToken,options)
            return accessToken

        }
        catch(err){
            if(err instanceof JsonWebTokenError){
                matcherLogger.error(`JSONWebToken error`,err)
            }
            
        }
    }
    public async verifyAccessToken(token:string ){
        try{
            const jwtpayload= jwt.verify(token,this.accessToken)
            return jwtpayload

        }
        catch(err){
            if(err instanceof TokenExpiredError){
                matcherLogger.info(`Token expired`)
                const expiresIn= err.expiredAt
                const message= err.message
                const now= new Date()

                matcherLogger.error(`Token has expired on ${expiresIn} and current time is ${now} with error message ${message}`)

                throw new ValidationException(
                    HTTP_STATUS.VALIDATION_ERROR.CODE,
                    `Token has expired on ${expiresIn} and current time is ${now} with error message ${message}`
                )


            }
            matcherLogger.error(`Token invalid`)
            throw(err)

        }

    }
    public async createRefreshToken(payload:IAuthPayload){
        try{
            const options={
                issuer:'FuckSubodhInAss',
                expiresIn: '1d'
            }as jwt.SignOptions

            const refreshtoken= await jwt.sign(payload,this.refreshToken,options)
            return refreshtoken
        }
        catch(err){
            if(err instanceof JsonWebTokenError)
            matcherLogger.error(`The refres token cant be created ${err}`)
        }


    }
}