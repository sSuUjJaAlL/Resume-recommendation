import { Router } from "express";
import ElasticController from "../controller/elastic/elastic.controller";
import getElasticInstane from "../controller/elastic/elastic.controller";
import getElasticInstance from "../controller/elastic/elastic.controller";

const elasticRouter= Router()
const elasticontroller=getElasticInstance().getUpload
elasticRouter.get('/upload',elasticontroller)

export default elasticRouter