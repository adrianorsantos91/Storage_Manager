const productsModels = require('../models/productsModels');

const getAll = async () => {
  const [result] = await productsModels.getAll();
  return result;
};
const getById = async (id) => {
    if (id) {
      const [result] = await productsModels.getById(id);
      return result;
    }
};

module.exports = {
  getAll,
  getById,
};
