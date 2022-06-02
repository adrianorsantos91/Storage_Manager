const getAll = (req, res) => {
  res.status(200).json({ message: 'Controller' });
};

const getById = (req, res, next) => {
  // const errorMessage = {
  //   status: 200,
  //   message: 'Funcionou',
  // };

  try {
    res.status(200).json({ message: 'ControllerId' });
  } catch (error) {
    next(error);
  }

  // throw error;
};

module.exports = {
  getAll,
  getById,
};
