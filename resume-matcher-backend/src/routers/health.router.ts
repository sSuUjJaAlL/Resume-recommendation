import { Router } from "express";
import getHealthInstances from "../controller/health/health.controller";

const healthControlelr = getHealthInstances();
const healthRouter = Router();

healthRouter.get("/health", healthControlelr.getHealthStatus);

export default healthRouter;
