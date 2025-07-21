import matcherLogger from "../libs/logger.libs";
import { UnknownAny } from "../types/types";
import mongoose from "mongoose";
import { getEnvValue } from "../utils/env.utils";

async function connectDatabase() {
  let retryCount = 5;
  let retryStatus = true;
  let isConnected = false;

  while (retryCount > 0 && retryStatus) {
    try {
      const connection = await mongoose.connect(
        getEnvValue("MONGO_URL") as string
      );
      matcherLogger.info(`The Database Connected Successfully`);
      return connection ? isConnected : false;
    } catch (err: UnknownAny) {
      matcherLogger.error(
        `Error Connecting to the Database,Retrying the Connection`
      );
      const isMaximumExceeded = retryCount.toString().startsWith("0");
      if (isMaximumExceeded) {
        matcherLogger.error(`Maximum Retry Mechanism is Exceeded`);
        isConnected = false;
        return isConnected;
      }
      retryCount = retryCount - 1;
      continue;
    }
  }
}

export default connectDatabase;
