import { IAPIResponse } from "../interface/api.interface"

class ElasticService{
    public async getElasticservice(){
        return {
      data: '',
      message: "Elastic service done ",
    }
        

    }
}
const getserviceInstance =()=>{
    return new ElasticService()
}
export default getserviceInstance