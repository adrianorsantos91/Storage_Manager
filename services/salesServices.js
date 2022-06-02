const salesModels = require('../models/salesModels');

const changeSalesToCamelCase = (salesData) => {
  const { id, date, product_id, quantity } = salesData;

  return {
    saleId: id,
    date,
    // eslint-disable-next-line camelcase
    productId: product_id,
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

module.exports = {
  getAll,
  getById,
};
