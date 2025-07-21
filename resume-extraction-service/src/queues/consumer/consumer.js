import extractConsumerConfig from "../../config/consumer.config.js";
async function startAllConsumer(channel) {
  for (const [key, value] of Object.entries(extractConsumerConfig)) {
    if (typeof value === "function") {
      await value(channel);
    }
  }
}

export default startAllConsumer;
