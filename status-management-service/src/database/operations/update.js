import fileModel from "../schema/status.schema.js";

class MongoUpdate {
  async updateOperation(payload) {
    const { id } = payload;
    return await fileModel.updateOne(
      {
        _id: id,
      },
      {
        ...payload,
      },
      {
        $new: true,
      }
    );
  }
}

const getMongoUpdate = () => {
  return new MongoUpdate();
};

export default getMongoUpdate;
