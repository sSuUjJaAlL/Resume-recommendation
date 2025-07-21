import { Channel } from "amqplib";
import { stateManagementConfig } from "../../config/queue.config";
import genericPublisher from "./generic.publisher";

async function publishMessageToStateManagement(
  channel: Channel,
  message: object
) {
  await genericPublisher(channel, message, stateManagementConfig);
}

export default publishMessageToStateManagement;
