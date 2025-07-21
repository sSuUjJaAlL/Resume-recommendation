const stateManagementConfig = Object.preventExtensions({
  name: "resume:state-management-consumer",
  exchange: "resume-matcher",
});

const elasticConfig = Object.preventExtensions({
  name: "resume:elastic-consumer-queue",
  exchange: "resume-matcher",
});

const extractionQueueConfig = Object.preventExtensions({
  name: "resume:extraction-consumer-queue",
  exchange: "resume-matcher",
});

export { stateManagementConfig, elasticConfig, extractionQueueConfig };
