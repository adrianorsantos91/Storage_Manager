const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
  const productsList = await productsService.getAll();
  return res.status(200).json(productsList);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const [productsList] = await productsService.getById(id);
  if (!productsList) {
   return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(productsList);
};

const create = async (req, res) => {
  const { name } = req.body;
  const productList = await productsService.getAll();

  const isExistsName = productList.find((e) => e.name === name);

  if (isExistsName) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const product = await productsService.create(req.body);
  return res.status(201).json(product);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productsService.updateById(id, req.body);

  if (!result) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const productUpdate = {
    id,
    name,
    quantity,
  };

  return res.status(200).json(productUpdate);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteById(id);

  if (!result) {
    return res.status(404).send({ message: 'Product not found' });
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
