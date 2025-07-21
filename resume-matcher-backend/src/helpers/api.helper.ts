import { Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.constant";
import { error } from "console";
import { IAPIResponse } from "../interface/api.interface";
import matcherLogger from "../libs/logger.libs";

class APIHelper {
  public apiMapper: Map<string, IAPIResponse> = new Map();

  public async sendGenericResponse<T>(
    res: Response,
    data: T,
    message: string,
    statusCode = HTTP_STATUS.INTERNAL_SERVER.CODE
  ) {
    
    return res.status(statusCode).json({
      message,
      data,
      statusCode,
      error: false,
    });
    
  }
  public async sendAcessTokenResponse<T>(
    res: Response,
    accessToken: T,
    message: string,
    statusCode = HTTP_STATUS.INTERNAL_SERVER.CODE
  ) {
    
    return res.status(statusCode).json({
      message,
      accessToken,
      statusCode,
      error: false,
    });
    
  }

  public async initalizeAPIPayload(url: string) {
    return new Promise((resolve, reject) => {
      this.apiMapper.set(url, {
        data: null,
        message: "",
      });
      resolve(true);
    });
  }

  public async getAPIPayload(url: string): Promise<IAPIResponse> {
    return new Promise((resolve, reject) => {
      if (this.apiMapper.has(url)) {
        const payload = this.apiMapper.get(url);
        if (payload) {
          resolve(payload);
        }
      }
    });
  }

  public async setAPIPayload(payload: IAPIResponse, url: string) {
    return new Promise((resolve, reject) => {
      if (this.apiMapper.has(url)) {
        this.apiMapper.set(url, payload);
      }
      resolve(true);
    });
  }

  public async clearAPIMapper() {
    if (this.apiMapper.size > 0) {
      this.apiMapper.clear();
    }
  }
}

const getAPIHelperInstance = (): APIHelper => {
  return new APIHelper();
};

export default getAPIHelperInstance;
