import amqp from "amqplib";
import elasticLogger from "../../libs/logger.libs";
import { Client } from "@elastic/elasticsearch";
import { IElasticPayload } from "../../interface/queue.interface";
import getElasticRepo from "../../elasticRepository/elastic.repository";
import { statusManagementConfig } from "../../constant/status.constant";
import publishMessageToStateManagement from "../publisher/stateManagement.publisher";
import getBroker from "../mainQueue";

async function elasticHandler(
  message: amqp.ConsumeMessage,
  elasticClient: Client
) {
  try {
    if (message) {
      const messageContent = message.content.toString();
      const parseContent = JSON.parse(messageContent);
      const { id } = parseContent;

      elasticLogger.info(
        `Message Received in the Elastic ${JSON.stringify(parseContent)}`
      );

      const { experience, skills, education, projects } =
        parseContent as Required<IElasticPayload>;

      const elasticCreatePayload = Object.preventExtensions({
        experience,
        skills,
        education,
        projects,
      });

      const elasticRepo = getElasticRepo();

      const createStatus = await elasticRepo.createPayload(
        elasticCreatePayload,
        elasticClient
      );

      if (!createStatus) {
        throw new Error(`ElasticSearch Create Operation Failed`);
      }

      const stateManagementQueuePayload = {
        id: id,
        status: statusManagementConfig["saveElastic"],
      };

      const broker = getBroker();

      const brokerChannel = await broker.getChannel();

      await publishMessageToStateManagement(
        brokerChannel as amqp.Channel,
        stateManagementQueuePayload
      );

      const brokerCloseChannel = await broker.closeChannel();
    }
  } catch (err: any) {
    elasticLogger.error(
      `Error Handling the Elastic Consumer, Error Due To ${err}`
    );
  }
}

export default elasticHandler;
