import extractionLogger from "../../../libs/logger.libs.js";
import { extractionQueueConfig } from "../../../config/queue.config.js";
import extractionHandler from "../handlers/extraction-resume.handler.js";

async function startExtractionConsumer(channel) {
  try {
    const { name, exchange } = extractionQueueConfig;

    await channel.assertExchange(exchange, "direct", { durable: true });

    await channel.assertQueue(name, { durable: true });

    extractionLogger.info(`Waiting For the Payload in the Extraction Queue`);

    await channel.consume(name, async (message) => {
      try {
        await extractionHandler(message);
      } catch (err) {
        extractionLogger.info(
          `Error in the Extraction Consumer, Due To ${err}`
        );
      } finally {
        channel.ack(message);
      }
    });
  } catch (err) {
    extractionLogger.error(`Error in the Extraction Consumer,Error : ${err}`);
  }
}

export default startExtractionConsumer;
