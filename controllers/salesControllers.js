const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const salesList = await salesService.getAll();
  res.status(200).json(salesList);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const saleId = await salesService.getById(id);

  if (!saleId || saleId.length === 0) {
    res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(saleId);
};

module.exports = {
  getAll,
  getById,
};
