import { Client } from "@elastic/elasticsearch";
import elasticLogger from "../libs/logger.libs";
import { elasticConnectionConfig } from "../config/elastic.config";

async function connectElasticSearch() {
  try {
    const elasticClient = new Client(elasticConnectionConfig);
    elasticLogger.info(`Elastic Search Connected SuccessFully`);
    return elasticClient;
  } catch (err: any) {
    elasticLogger.error(
      `Error Connecting to the Elastic Search, Please Check the Elastic Search is Running or Not`
    );
  }
}

async function getElasticClient(): Promise<Client> {
  const client = await connectElasticSearch();
  return client as Client;
}

export { getElasticClient };
