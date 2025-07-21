import { getEnvValue } from "../utils/env.utils";

export const elasticConnectionConfig = {
  node: getEnvValue("ELASTIC_URL"),
  transport: {
    requestParams: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
};
