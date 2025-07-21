import stateManagementLogger from "../../../libs/logger.libs.js";
import { stateManagementConfig } from "../../../config/queue.config.js";
import statusManagementHandler from "../handlers/status-management.consumer.js";

async function startStateManagementConsumer(channel) {
  try {
    const { name, exchange } = stateManagementConfig;

    await channel.assertExchange(exchange, "direct", { durable: true });

    await channel.assertQueue(name, { durable: true });

    stateManagementLogger.info(
      `Waiting For the Payload in the State Management Queue`
    );

    await channel.consume(name, async (message) => {
      try {
        await statusManagementHandler(message);
      } catch (err) {
        stateManagementLogger.info(
          `Error in the State Management Consumer, Due To ${err}`
        );
      } finally {
        channel.ack(message);
      }
    });
  } catch (err) {
    stateManagementLogger.info(
      `Error in the StateManagement Consumer,Error : ${err}`
    );
  }
}

export default startStateManagementConsumer;
