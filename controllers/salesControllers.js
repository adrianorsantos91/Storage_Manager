const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const salesList = await salesService.getAll();
  res.status(200).json(salesList);
};

const getById = async (req, res) => {
  const { id } = req.params;
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

const updateById = (req, res) => {
  const { id } = req.params;
  const salesData = req.body;
  const result = salesService.updateById(id, salesData);
  if (!result) {
    return res.status(404).send({ message: 'Sales not found' });
  }

  const salesUpdate = {
    saleId: parseInt(id, 0),
    itemUpdated: salesData,
  };

  return res.status(200).json(salesUpdate);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
};
