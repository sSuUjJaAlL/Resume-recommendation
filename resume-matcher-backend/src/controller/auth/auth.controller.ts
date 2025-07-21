import { Request, Response, NextFunction } from "express";
import { UnknownAny } from "../../types/types";
import matcherLogger from "../../libs/logger.libs";
import getAuthService from "../../services/auth.service";
import getAPIHelperInstance from "../../helpers/api.helper";
import { loginSchema, signUpSchema } from "../../validation/auth.validation";

const apiHelper = getAPIHelperInstance();
const authService = getAuthService();

class AuthController {
  public async signUpController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await apiHelper.clearAPIMapper();
    try {
      const url = req.originalUrl as string;
      const parseContent = await signUpSchema.parseAsync(req.body);
      await apiHelper.initalizeAPIPayload(url);
      const apiPayload = await authService.signUpService(parseContent);
      await apiHelper.setAPIPayload(apiPayload, url);
      const { data, message } = await apiHelper.getAPIPayload(url);
      apiHelper.sendGenericResponse(res, data, message);
    } catch (err: UnknownAny) {
      matcherLogger.error(
        `Error in the Sign Up Controller, Error Due To ${err}`
      );
      next(err);
    }
  }
  public async loginController(
    req:Request,
    res:Response,
    next:NextFunction){
      await apiHelper.clearAPIMapper();
      try{

        const url = req.originalUrl as string;
        const parseContent= await loginSchema.parseAsync(req.body);
        await apiHelper.initalizeAPIPayload(url);
        const apiPayload= await authService.loginService(parseContent);
        
        await apiHelper.setAPIPayload(apiPayload, url);
        const { data, message } = await apiHelper.getAPIPayload(url);
        apiHelper.sendAcessTokenResponse(res, data, message);
        
      }
      

    catch(err:UnknownAny){
      matcherLogger.error(`Error in Login Controller, Error Due To ${err}`)
    ;
    next(err);
  }
}
}

const getAuthInstances = () => {
  return new AuthController();
};

export default getAuthInstances;
