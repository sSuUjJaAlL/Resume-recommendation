import { JsonWebTokenError } from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/http-status.constant";
import { DatabaseException } from "../exceptions";
import  BcryptHelper  from "../helpers/bcrypt.helper";
import { IAPIResponse } from "../interface/api.interface";
import { IAuthPayload } from "../interface/auth.interface";

import JwtHelper from "../helpers/jwt.helper";
import { string } from "zod";
import UserRepository from "../repository/user.repository";
import matcherLogger from "../libs/logger.libs";

const userrepo= new UserRepository()
const bcrypthelper= new BcryptHelper()
const jwttoken= new JwtHelper()

class AuthService {
  public async signUpService(payload: IAuthPayload): Promise<IAPIResponse> {
    const {email,name,password}= payload
    const sameEmailExists= await userrepo.searchUser('email',email)

    if(sameEmailExists){
      throw new DatabaseException(
        HTTP_STATUS.DATABASE_ERROR.CODE,
        `Provided Email ${email} already exists`
      )
    }
    const hashpassword = await bcrypthelper.hashPassword(password)

    const sendPayload= {
      email,
      name,
      password:hashpassword
    }
    const saveResult= await userrepo.saveResult(sendPayload)

    

    return {
      data: saveResult,
      message: "Your signup is successful ",
    }
  }
  public async loginService(payload:Partial<IAuthPayload>){
    const {email,password}=payload
    matcherLogger.info(email);

    const emailExist= await userrepo.searchUser('email',email)
    matcherLogger.info(emailExist);
    if(!emailExist){
      throw new DatabaseException(
        HTTP_STATUS.DATABASE_ERROR.CODE,
        `The email ${email} doesnt exist`
      )
    }
    const dbPassword= emailExist.password
    const checkPassword=await bcrypthelper.comparePassword(password as string,dbPassword as string)
    matcherLogger.info(checkPassword)

    if(!checkPassword){
      throw new DatabaseException(
        HTTP_STATUS.DATABASE_ERROR.CODE,
        `Wrong Password Inserted`
      )
    }
    const { name}=emailExist
    const sendPayload={
      email ,
      name
    }
    const sendtojwt= await jwttoken.createAccessToken(sendPayload as any)
    matcherLogger.info(sendtojwt)


    return {
      data: sendtojwt,
      message: "Login successful ",
    }
  }
}


const getAuthService = (): AuthService => {
  return new AuthService();
};

export default getAuthService;
