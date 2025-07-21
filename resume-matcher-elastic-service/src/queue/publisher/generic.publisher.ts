import { Channel } from "amqplib";
import elasticLogger from "../../libs/logger.libs";

async function genericPublisher(
  channel: Channel,
  message: object,
  config: { name: string; exchange: string }
) {
  const { name, exchange } = config;
  try {
    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(name, { durable: true });
    const messageString = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(name, messageString);
    elasticLogger.info(`Message Publish To The ${name} Queue`);
  } catch (err) {
    elasticLogger.error(
      `Error Publishing to the ${name} Queue,Error Due To ${err}`
    );
  }
}

export default genericPublisher;
