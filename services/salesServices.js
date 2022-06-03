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
      console.log('ServiceId', result);
      return result.map(changeSalesToCamelCase);
    }
};

const create = async (salesData) => {
  const result = await salesModels.create(salesData);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
