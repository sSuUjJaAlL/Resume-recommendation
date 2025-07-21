import processFileValidation from "../helpers/file.helper";
import { IFilePayload } from "../interface/file.interface";
import fileModel from "../database/schemas/status.schema";
import { statusManagementConfig } from "../constants/status.constant";
import getBroker from "../queue/mainQueueManager";
import publishStatusManagementQueue from "../queue/publisher/statusManagement.publisher";
import amqp from "amqplib";
import getStatusRepository from "../repository/status.repository";
import { IStatusSchema } from "../interface/status.interface";

import matcherLogger from "../libs/logger.libs";
import publishToExtractionQueue from "../queue/publisher/extraction.publisher";

class MatchService {
  public async uploadFileProcess(payload: IFilePayload) {
    let apiPayload = {
      data: null,
      message: "Processing the Uploaded CV or Resume",
    };

    return processFileValidation(payload).then((status: boolean) => {
      if (!status) {
        throw new Error(`The File Validation Has Not been SuccessFully`);
      }

      return new Promise(async (resolve, reject) => {
        const statusRepo = getStatusRepository();

        const { filename, mimetype, encoding, size, path } = payload;

        const stateManagementPayload = {
          fileName: filename,
          fileMimeType: mimetype,
          fileEncoding: encoding,
          fileSize: size,
          status: statusManagementConfig["processing"],
        } as IStatusSchema;

        const brokerInstance = getBroker();

        const brokerChannel = await brokerInstance.getChannel();

        await publishStatusManagementQueue(
          brokerChannel["channel"] as amqp.Channel,
          stateManagementPayload
        );

        const saveResult = await statusRepo.saveStatus(stateManagementPayload);

        const saveObjectId = "_id" in saveResult ? saveResult._id : "";

        const saveStateManagementPayload = {
          ...stateManagementPayload,
          id: saveObjectId,
          status: statusManagementConfig["saveMongo"],
        };

        await publishStatusManagementQueue(
          brokerChannel["channel"] as amqp.Channel,
          saveStateManagementPayload
        );

        await publishToExtractionQueue(
          brokerChannel["channel"] as amqp.Channel,
          { path: path , id: saveObjectId}
        );

        resolve(apiPayload);
      });
    });
  }
}

const getMatchService = (): MatchService => {
  return new MatchService();
};

export default getMatchService;
