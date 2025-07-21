import fileModel from "../schema/status.schema.js";

class MongoCreate {
  async createOperation(payload) {
    return await fileModel.create({ ...payload });
  }
}

const getMongoCreate = () => {
  return new MongoCreate();
};

export default getMongoCreate;
