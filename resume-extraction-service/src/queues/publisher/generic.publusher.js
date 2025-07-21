import extractionLogger from "../../libs/logger.libs.js";

async function publishMessage(channel, message, config) {
  try {
    const { name, exchange } = config;
    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(name, { durable: true });
    const messageString = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(name, messageString);
    extractionLogger.info(`Message Publish To The ${name} Queue`);
  } catch (err) {
    extractionLogger.error(
      `Error Publishing to the State Management Queue,Error Due To ${err}`
    );
  }
}

export default publishMessage;
