import { IAPIResponse } from "../interface/api.interface";

class HealthService {
  public async getHealthService(): Promise<IAPIResponse> {
    const payload = {
      status: true,
      time: new Date().toDateString(),
      error: false,
    };
    return {
      data: payload,
      message: `The Backend Service is Running Perfectly`,
    };
  }
}

const getHealthService = (): HealthService => {
  return new HealthService();
};

export default getHealthService;
