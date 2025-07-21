import amqp from "amqplib";
import matcherLogger from "../../libs/logger.libs";
import { extractionQueueConfig } from "../../config/queue.config";

async function publishToExtractionQueue(
  channel: amqp.Channel,
  message: object
) {
  try {
    const { name, exchange } = extractionQueueConfig;
    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(name, { durable: true });

    const messageString = Buffer.from(JSON.stringify(message));

    channel.sendToQueue(name, messageString);
    matcherLogger.info(`The Message Has been Publish to the ${name} Queue`);
  } catch (err) {
    matcherLogger.error(
      `Error While Publishing to the Extraction Queue, Error ${err}`
    );
  }
}
export default publishToExtractionQueue;
