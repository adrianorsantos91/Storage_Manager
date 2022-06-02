const salesModels = require('../models/salesModels');

const getAll = async () => {
  const [result] = await salesModels.getAll();
  return result;
};
const getById = async (id) => {
    if (id) {
      const [result] = await salesModels.getById(id);
      return result;
    }
};

module.exports = {
  getAll,
  getById,
};
