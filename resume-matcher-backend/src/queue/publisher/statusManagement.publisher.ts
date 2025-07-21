import { Channel } from "amqplib";
import { UnknownAny } from "../../types/types";
import matcherLogger from "../../libs/logger.libs";
import { stateManagementConfig } from "../../config/queue.config";

async function publishStatusManagementQueue(channel: Channel, message: object) {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, exchange } = stateManagementConfig;
      await channel.assertExchange(exchange, "direct", { durable: true });
      await channel.assertQueue(name, { durable: true });
      const messageString = Buffer.from(JSON.stringify(message));
      channel.sendToQueue(name, messageString);
      matcherLogger.info(`Message Published to the ${name} Queue`);
      resolve(true);
    } catch (err: UnknownAny) {
      matcherLogger.error(`Error Publishing to the Status Management Queue`);
    }
  });
}

export default publishStatusManagementQueue;
