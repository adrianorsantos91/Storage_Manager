const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
  const productsList = await productsService.getAll();
  res.status(200).json(productsList);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const [productsList] = await productsService.getById(id);
  if (!productsList) {
   return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(productsList);
};

const create = async (req, res) => {
  const { name } = req.body;
  const productList = await productsService.getAll();

  const isExistsName = productList.find((e) => e.name === name);

  if (isExistsName) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const product = await productsService.create(req.body);
  res.status(201).json(product);
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
    res.status(404).send({ message: 'Product not found' });
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

// const getById = (req, res, next) => {
//   // const errorMessage = {
//   //   status: 200,
//   //   message: 'Funcionou',
//   // };

//   try {
//     res.status(200).json({ message: 'ControllerId' });
//   } catch (error) {
//     next(error);
//   }

//   // throw error;
// };
