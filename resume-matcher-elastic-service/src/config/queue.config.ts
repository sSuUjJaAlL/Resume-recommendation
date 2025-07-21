const elasticConfig = Object.preventExtensions({
  name: "resume:elastic-consumer-queue",
  exchange: "resume-matcher",
});

const stateManagementConfig = Object.preventExtensions({
  name: "resume:state-management-consumer",
  exchange: "resume-matcher",
});

export { elasticConfig, stateManagementConfig };
