class MongoSelect {
  async findGeneric(key, value, model) {
    const result = await model.findOne({
      [`${key}`]: value,
    });
    return result;
  }
}

const getMongoSelect = () => {
  return new MongoSelect();
};

export default getMongoSelect;
