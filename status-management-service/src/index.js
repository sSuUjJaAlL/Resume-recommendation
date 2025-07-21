import { getRabbitMQChannel } from "./queues/connection.js";
import startAllConsumer from "./queues/consumer/consumer.js";

async function start() {
  const brokerChannel = await getRabbitMQChannel();
  await startAllConsumer(brokerChannel);
}

(async () => {
  await start();
})();


