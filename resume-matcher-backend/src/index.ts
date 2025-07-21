import express from "express";
import startExpressServer from "./server";
import matcherLogger from "./libs/logger.libs";

async function startServer() {
  const app = express();
  await startExpressServer(app);
}

(async () => {
  matcherLogger.info(`Starting the Express Server....`);
  await startServer();
})();
