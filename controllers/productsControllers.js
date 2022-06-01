const getAll = (req, res) => {
  res.status(200).json({ message: 'Controller' });
};

const getById = (req, res) => {
  res.status(200).json({ message: 'ControllerId' });
};

module.exports = {
  getAll,
  getById,
};
