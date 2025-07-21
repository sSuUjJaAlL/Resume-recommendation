import stateManagementLogger from "../libs/logger.libs.js";
import { getEnvValue, getObjectValue } from "../utils/env.utils.js";
import mongoose from "mongoose";

class MongoConnection {
  mongoConnection = null;

  async openConnection() {
    let isConnected = false;
    try {
      const mongoUrl = getEnvValue("MONGO_URL");
      const connection = await mongoose.connect(mongoUrl);
      if (!this.mongoConnection) {
        this.mongoConnection = connection;
      }
      isConnected = true;
      stateManagementLogger.info(`The Mongo Connection Has been Opened`);
      return isConnected;
    } catch (err) {
      console.log(err);
      stateManagementLogger.error(
        `Error Opening the Mongo Connection, Check the MongoDB`
      );
    }
  }

  async closeConnection() {
    if (this.mongoConnection) {
      this.mongoConnection = null;
      stateManagementLogger.info(`The Mongo Connection Has been Closed`);
    }
  }
}

const getMongoInstances = () => {
  return new MongoConnection();
};

export default getMongoInstances;
