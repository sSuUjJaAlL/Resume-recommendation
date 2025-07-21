import { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../../types/types";
import getAPIHelperInstance from "../../helpers/api.helper";
import getMatchService from "../../services/match.service";
import { IFilePayload } from "../../interface/file.interface";
import { IAPIResponse } from "../../interface/api.interface";

const apiHelper = getAPIHelperInstance();
const matchService = getMatchService();

class MatchController {
  public async uploadResumeProcess(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await apiHelper.clearAPIMapper();
    try {
      const url = req.originalUrl;

      const fileContent = req.file;

      await apiHelper.initalizeAPIPayload(url);

      const apiPayload = await matchService.uploadFileProcess(
        fileContent as Required<IFilePayload>
      );

      await apiHelper.setAPIPayload(apiPayload as IAPIResponse, url);

      const apiResponse = await apiHelper.getAPIPayload(url);

      const { data, message } = apiResponse;

      apiHelper.sendGenericResponse(res, data, message);
    } catch (err: UnknownAny) {
      next(err);
    }
  }
}

const getMatchController = (): MatchController => {
  return new MatchController();
};

export default getMatchController;
