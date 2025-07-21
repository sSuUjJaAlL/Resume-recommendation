import { elasticConfig } from "../../config/queue.config.js";
import publishMessage from "./generic.publusher.js";

async function publishToElasitcConsumer(channel, message) {
  await publishMessage(channel, message, elasticConfig);
}

export default publishToElasitcConsumer;
