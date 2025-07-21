import { Client } from "@elastic/elasticsearch";
import elasticLogger from "../../libs/logger.libs";
import { text } from "stream/consumers";
import { IndicesCreateResponse } from "@elastic/elasticsearch/lib/api/types";
import { UploadedindexName } from "../../constant/index.constant";

const indexName = UploadedindexName;

async function createUploadedIndex(client: Client) {
  try {
    const isIndexExists = await client.indices.exists({
      index: indexName,
    });

    if (isIndexExists) {
      elasticLogger.info(`The Index Is Already Exists.... Skipping It`);
      return;
    }

    const createResult: IndicesCreateResponse = await client.indices.create({
      index: indexName,
      settings: {
        number_of_replicas: 2,
        number_of_shards: 2,
      },
      mappings: {
        properties: {
          experience: { type: "text" },
          skills: { type: "text" },
          education: { type: "text" },
          projects: { type: "text" },
        },
      },
    });

    const isAckCreated = createResult.acknowledged;
    if (isAckCreated) {
      elasticLogger.info(
        `The Index ${indexName} Has been Created Successfully`
      );
    }
  } catch (err: any) {
    elasticLogger.error(`Error Creating the Uploaded CV Index`);
  }
}

export default createUploadedIndex;
