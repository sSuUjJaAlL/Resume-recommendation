import { Router } from "express";
import upload from "../config/multer.config";
import getMatchController from "../controller/matcher/match.controller";

const matchController = getMatchController();
const matchRouter = Router();

matchRouter.post(
  "/match/upload-resume",
  upload.single("cv"),
  matchController.uploadResumeProcess
);

export default matchRouter;
