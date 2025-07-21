import startStateManagementConsumer from "../queues/consumer/consumer/status-management.consumer.js";
const consumerConfig = Object.preventExtensions({
  stateManagement: startStateManagementConsumer,
});

export default consumerConfig;
