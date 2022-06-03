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

const create = ({ name, quantity }) => {
  const result = productsModels.create(name, quantity);
  return result;
};

const updateById = async (id, { name, quantity }) => {
  const [result] = await productsModels.updateById(id, name, quantity);
  console.log(result.changedRows);
  if (!result.changedRows) {
    return false;
  }
  return result;
};

const deleteById = async (id) => {
  const [result] = await productsModels.deleteById(id);
  console.log(result.affectedRows);
  if (!result.affectedRows) {
    return false;
  }
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
