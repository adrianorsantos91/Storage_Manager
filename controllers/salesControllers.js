const salesService = require('../services/salesServices');
// const productsServices = require('../services/productsServices');
// const productsModels = require('../models/productsModels');
// const errorHandler = require('../utils/errorHandler');

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
  console.log('productList', productList);
  if (!productList) {
    return res.status(400).json({ message: 'Venda não adicionada' });
  }

  return res.status(201).json(productList);
};

// const create = async (req, res, next) => {
//   // const salesData = req.body;
//   try {
//     const productList = await salesService.create(req.body);
//     if (!productList) {
//       throw errorHandler(400, 'Venda não adicionada');
//     }

//     return res.status(201).json(productList);
//   } catch (error) {
//     next(error);
//   }
// };

const updateById = async (req, res) => {
  const { id } = req.params;
  const salesData = req.body;
  const result = await salesService.updateById(id, salesData);
  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  const salesUpdate = {
    saleId: parseInt(id, 0),
    itemUpdated: salesData,
  };

  return res.status(200).json(salesUpdate);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteById(id);

  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
