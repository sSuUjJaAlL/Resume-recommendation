import { stateManagementConfig } from "../../config/queue.config.js";
import publishMessage from "./generic.publusher.js";

async function publishToStateManagement(channel, message) {
  await publishMessage(channel, message, stateManagementConfig);
}

export default publishToStateManagement;
