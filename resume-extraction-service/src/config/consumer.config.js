import startExtractionConsumer from "../queues/consumer/consumer/extraction-resume.consumer.js";

const extractConsumerConfig = Object.preventExtensions({
  extractionConsumer: startExtractionConsumer,
});

export default extractConsumerConfig;
