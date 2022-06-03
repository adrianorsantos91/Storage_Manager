const productsModels = require('../models/productsModels');

const getAll = async () => {
  const [result] = await productsModels.getAll();
  console.log(result);
  return result;
};
const getById = async (id) => {
    if (id) {
      const [result] = await productsModels.getById(id);
      return result;
    }
};

const create = ({ name, quantity }) => {
  const result = productsModels.create(name, quantity);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
