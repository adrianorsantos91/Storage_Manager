const productsModels = require('../models/productsModels');

const getAll = async () => {
  const [result] = await productsModels.getAll();
  console.log('Result: %s', result);
  return result;
};

module.exports = {
  getAll,
};
