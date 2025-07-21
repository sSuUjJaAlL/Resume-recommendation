import { Client } from "@elastic/elasticsearch";
import { IElasticPayload } from "../interface/queue.interface";
import { UploadedindexName } from "../constant/index.constant";
import { WriteResponseBase } from "@elastic/elasticsearch/lib/api/types";
import elasticLogger from "../libs/logger.libs";

class ElasticRepository {
  public async createPayload(payload: IElasticPayload, elasticClient: Client) {
    return new Promise(async (resolve, reject) => {
      const saveResult: WriteResponseBase = await elasticClient.index({
        index: UploadedindexName,
        document: {
          ...payload,
        },
      });

      elasticLogger.info(
        `Payload Is Saved on the Elastic Search on the Shards : ${saveResult._shards}`
      );
      resolve(true);
    });
  }
}

const getElasticRepo = (): ElasticRepository => {
  return new ElasticRepository();
};

export default getElasticRepo;
