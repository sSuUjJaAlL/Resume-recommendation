import consumerConfig from "../../config/consumer.config.js";

async function startAllConsumer(channel) {
  for (const [key, value] of Object.entries(consumerConfig)) {
    if (typeof value === "function") {
      await value(channel);
    }
  }
}

export default startAllConsumer;
