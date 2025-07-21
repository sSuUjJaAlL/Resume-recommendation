export const extractionQueueConfig = Object.preventExtensions({
  name: "resume:extraction-consumer-queue",
  exchange: "resume-matcher",
});

export const stateManagementConfig = Object.preventExtensions({
  name: "resume:state-management-consumer",
  exchange: "resume-matcher",
});


export const elasticConfig = Object.preventExtensions({
  name: "resume:elastic-consumer-queue",
  exchange: "resume-matcher",
});

