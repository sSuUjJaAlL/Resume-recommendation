import e, { NextFunction, Request, Response } from "express";
import { IAPIResponse } from "../../interface/api.interface";
import APIHelper from "../../helpers/api.helper";
import getHealthService from "../../services/health.service";
import getAPIHelperInstance from "../../helpers/api.helper";

const apiHelper = getAPIHelperInstance();
const healthService = getHealthService();

class HealthController {
  public async getHealthStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IAPIResponse | void> {
    await apiHelper.clearAPIMapper();
    try {
      const requestedUrl = req.originalUrl;
      await apiHelper.initalizeAPIPayload(requestedUrl);
      const apiResponse = await healthService.getHealthService();
      apiHelper.setAPIPayload(apiResponse, requestedUrl);
      const { data, message } = await apiHelper.getAPIPayload(requestedUrl);
      apiHelper.sendGenericResponse(res, data, message);
    } catch (err) {
      next(err);
    }
  }
}

const getHealthInstances = (): HealthController => {
  return new HealthController();
};

export default getHealthInstances;
