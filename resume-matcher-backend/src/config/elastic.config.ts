import { getEnvValue } from "../utils/env.utils";

const connecttoElastic= {
    node:getEnvValue("ELASTIC_URL"),
    transport:{
        requestParams:{
            headers:{
                "Content-Type":"application/json"
            }
        }
    }
}
export {connecttoElastic}