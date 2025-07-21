import { Application } from "express";
import healthRouter from "./health.router";
import matchRouter from "./match.router";
import authRouter from "./auth.router";

async function initalizeRouters(app: Application) {
  app.use("/api/v1", [healthRouter, matchRouter,authRouter]);
}

export default initalizeRouters;
