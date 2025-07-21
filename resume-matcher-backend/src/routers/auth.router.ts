import { Router } from "express";
import getAuthInstances from "../controller/auth/auth.controller";
import { get } from "http";
import { checkToken } from "../middleware/auth.middleware";

const authRouter = Router();
const signUpcontroller=getAuthInstances().signUpController
const logincontroller= getAuthInstances().loginController

authRouter.post("/signup",signUpcontroller);

authRouter.post("/login",logincontroller)
authRouter.get("/getProfile",checkToken,(req,res)=>{res.send(`I am subodh`)})
export default authRouter;
