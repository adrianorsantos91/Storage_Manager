const salesModels = require('../models/salesModels');

const changeSalesToCamelCase = (salesData) => {
  const { id, date, quantity } = salesData;

  return {
    saleId: id,
    date,
    productId: salesData.product_id,
    quantity,
  };
};

const getAll = async () => {
  const [result] = await salesModels.getAll();
  return result.map(changeSalesToCamelCase);
};
const getById = async (id) => {
    if (id) {
      const [result] = await salesModels.getById(id);
      return result.map(changeSalesToCamelCase);
    }
};

const create = async (salesData) => {
  const result = await salesModels.create(salesData);
  return result;
};

const updateById = async (id, salesData) => {
  const [result] = await salesModels.updateById(id, salesData);
  if (!result.changedRows) {
    return false;
  }
  return true;
};

const deleteById = async (id) => {
  const [result] = await salesModels.deleteById(id);
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
  changeSalesToCamelCase,
};
