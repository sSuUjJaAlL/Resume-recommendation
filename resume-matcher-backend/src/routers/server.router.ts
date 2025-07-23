import { Application } from "express";
import healthRouter from "./health.router";
import matchRouter from "./match.router";
import authRouter from "./auth.router";
import elasticRouter from "./elastic.router";

async function initalizeRouters(app: Application) {
  app.use("/api/v1", [healthRouter, matchRouter,authRouter,elasticRouter]);
}

export default initalizeRouters;
