const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const salesList = await salesService.getAll();
  res.status(200).json(salesList);
};

const getById = async (req, res) => {
  console.log('Aqui!!');
  const { id } = req.params;
  console.log('controllerId', id);
  const saleId = await salesService.getById(id);

  if (!saleId || saleId.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(saleId);
};

const create = async (req, res) => {
  const productList = await salesService.create(req.body);
  if (productList) {
    return res.status(201).json(productList);
  }

  res.status(400).json({ message: `Algo esta errado: %s ${productList}` });
};

module.exports = {
  getAll,
  getById,
  create,
};
