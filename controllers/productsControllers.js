const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
  console.log('all');
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

  productList.forEach((e) => {
    if (e.name === name) {
      return res.status(409).json({ message: 'Product already exists' });
    }
  });

  const product = await productsService.create(req.body);
  return res.status(201).json(product);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const productList = await productsService.getAll();
  const result = await productsService.updateById(id, req.body);
  productList.forEach((e) => {
    if (e.id === id) {
      return res.status(200).json(result);
    }
  });

  return res.status(404).send({ message: 'Product not found' });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
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
