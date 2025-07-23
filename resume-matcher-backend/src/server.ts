import { UnknownAny } from "./types/types";
import matcherLogger from "./libs/logger.libs";
import { Application } from "express";
import initalizeMiddleware from "./middleware/server.middleware";
import initalizeRouters from "./routers/server.router";
import { getEnvValue } from "./utils/env.utils";
import connectDatabase from "./database/connect";
import { connecttoElastic } from "./config/elastic.config";
import { getElasticClient } from "./elasticSearch/connect";

async function startExpressServer(app: Application) {
  try {
    await initalizeMiddleware(app);
    await initalizeRouters(app);
    await getElasticClient();
    connectDatabase()
      .then(() => {
        app.listen(getEnvValue("PORT"), () => {
          matcherLogger.info(
            `Server is Starting on the http://localhost:${getEnvValue(
              "PORT"
            )}/api/v1`
          );
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err: UnknownAny) {
    matcherLogger.error(`Error Starting the Express Server, Error : ${err}`);
    matcherLogger.info(`Server is Terminating.....`);
    process.exit(1);
  }
}

export default startExpressServer;
