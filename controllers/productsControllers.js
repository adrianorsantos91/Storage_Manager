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
    res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(productsList);
};

const create = async (req, res) => {
  const { name } = req.body;
  const productList = await productsService.getAll();

  productList.forEach((e) => {
    console.log(e.name);
    if (e.name === name) {
      return res.status(409).json({ message: 'Product already exists' });
    }
  });

  const product = await productsService.create(req.body);
  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
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
