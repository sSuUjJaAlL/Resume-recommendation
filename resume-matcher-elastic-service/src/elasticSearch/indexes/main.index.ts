import { Client } from "@elastic/elasticsearch";
import { getElasticClient } from "../connect";
import createUploadedIndex from "./uploaded-cv.index";

const indexsConfig = [createUploadedIndex];

async function createAllIndexes(client: Client) {
  for (const index of indexsConfig) {
    if (typeof index === "function") {
      index(client);
    }
  }
}

export default createAllIndexes;
