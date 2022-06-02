const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
  const productsList = await productsService.getAll();
  res.status(200).json(productsList);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productsAllList = await productsService.getAll();
  const productsList = await productsService.getById(id);

  const isValidId = productsAllList.find((p) => p.id === parseInt(id, 2));

  if (!isValidId) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(productsList);
};

module.exports = {
  getAll,
  getById,
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
