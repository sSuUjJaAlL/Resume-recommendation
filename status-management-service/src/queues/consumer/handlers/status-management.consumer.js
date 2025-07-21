import getMongoInstances from "../../../database/connect.js";
import getMongoCreate from "../../../database/operations/create.js";
import getMongoUpdate from "../../../database/operations/update.js";
import getMongoSelect from "../../../database/operations/select.js";
import fileModel from "../../../database/schema/status.schema.js";
import stateManagementLogger from "../../../libs/logger.libs.js";

async function statusManagementHandler(message) {
  const mongoInstance = getMongoInstances();
  const mongoConnection = await mongoInstance.openConnection();
  try {
    if (message && mongoConnection) {
      const mongoCreate = getMongoCreate();
      const mongoUpdate = getMongoUpdate();
      const mongoSelect = getMongoSelect();

      const messageContent = message.content;
      const parseContent = JSON.parse(messageContent.toString());
      stateManagementLogger.info(
        `Message Received on the Queue : ${JSON.stringify(parseContent)}`
      );
      const containId = "id" in parseContent;
      if (containId) {
        const isRecordExists = await mongoSelect.findGeneric(
          "_id",
          parseContent["id"],
          fileModel
        );
        if (!isRecordExists) {
          await mongoCreate.createOperation(parseContent);
        }

        await mongoUpdate.updateOperation(parseContent);
      }
    }
  } catch (err) {
    throw err;
  } finally {
    if (mongoConnection) {
      await mongoInstance.closeConnection();
    }
  }
}

export default statusManagementHandler;
