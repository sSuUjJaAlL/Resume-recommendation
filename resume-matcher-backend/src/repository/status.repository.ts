import { IStatusSchema } from "../interface/status.interface";
import fileModel from "../database/schemas/status.schema";

class StatusRepository {
  public async saveStatus(payload: IStatusSchema) {
    const saveResult = await fileModel.create({
      ...payload,
    });
    return saveResult.save();
  }
}

const getStatusRepository = (): StatusRepository => {
  return new StatusRepository();
};

export default getStatusRepository;
