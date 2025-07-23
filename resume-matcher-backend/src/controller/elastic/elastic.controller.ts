import { Response,Request,NextFunction } from "express"
import getAPIHelperInstance from "../../helpers/api.helper"
import matcherLogger from "../../libs/logger.libs"
import getserviceInstance from "../../services/elastic.service"
import { match } from "assert"
const apihelper= getAPIHelperInstance()
const elasticservice= getserviceInstance()

class ElasticController{

    public async getUpload(
        req:Request,
        res:Response,
        next:NextFunction
    ){
        await apihelper.clearAPIMapper()
        try{
            const url= req.originalUrl;
            await apihelper.initalizeAPIPayload(url) 
            const elasticService = await elasticservice.getElasticservice()
            await apihelper.setAPIPayload(elasticService,url)

            const { data ,message }= await apihelper.getAPIPayload(url)
            apihelper.sendGenericResponse(res,data,message)
           
            



        }catch(err){
            matcherLogger.error(`error in elastic controller`)

        }
        next()


    }
    

}
const getElasticInstance=()=>{
        return new ElasticController()
}

export default getElasticInstance

