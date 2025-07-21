import { Channel } from "amqplib";
import amqp from "amqplib";
import elasticLogger from "../../libs/logger.libs";
import { elasticConfig } from "../../config/queue.config";
import elasticHandler from "../handler/elastic.handler";
import { getElasticClient } from "../../elasticSearch/connect";
import createAllIndexes from "../../elasticSearch/indexes/main.index";

async function elasticConsumer(channel: Channel) {
  const elasticClient = await getElasticClient();
  await createAllIndexes(elasticClient);
  try {
    const { name, exchange } = elasticConfig;
    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(name, { durable: true });

    elasticLogger.info(`Waiting For the Message in the ${name} Queue`);

    channel.consume(name, async (message: amqp.ConsumeMessage | null) => {
      try {
        await elasticHandler(message as amqp.ConsumeMessage,elasticClient);
      } catch (err) {
        elasticLogger.error(
          `Error While Consuming the Elastic Handler, Due To ${err}`
        );
      } finally {
        if (channel && message) {
          channel.ack(message);
        }
      }
    });
  } catch (err: any) {
    elasticLogger.info(`Error in the Elastic Consumer, Due To ${err}`);
  }
}

export default elasticConsumer;
