const productsService = require('../services/productsServices');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  res.status(200).json(result);
};

const getById = (req, res, next) => {
  try {
    res.status(200).json({ message: 'ControllerId' });
  } catch (error) {
    next(error);
  }
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
