import { constants } from "buffer";
import {Client} from '@elastic/elasticsearch'
import { connecttoElastic } from "../config/elastic.config";
import matcherLogger from "../libs/logger.libs";

async function connectelasticsearch(){
    try{
        const elasticClient= new Client(connecttoElastic);
        matcherLogger.info("Elastic Search connection")
        return elasticClient
    }catch(err){
        matcherLogger.error('Error connecting to elastic search .Please Check if elastic search is running or not')

    }
}
async function getElasticClient(){
    const client = await connectelasticsearch()
    return client as Client
}
export{getElasticClient}