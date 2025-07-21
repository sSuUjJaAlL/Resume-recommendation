import { Router } from "express";
import getAuthInstances from "../controller/auth/auth.controller";
import { get } from "http";

const authRouter = Router();
const signUpcontroller=getAuthInstances().signUpController
const logincontroller= getAuthInstances().loginController

authRouter.post("/signup",signUpcontroller);

authRouter.post("/login",logincontroller)

//authRouter.get("/getProfile",getProfileController)
export default authRouter;
