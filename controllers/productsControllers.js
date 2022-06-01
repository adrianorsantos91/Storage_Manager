const test = (req, res) => {
  res.status(200).json({ message: 'Controller' });
};

const testId = (req, res) => {
  res.status(200).json({ message: 'ControllerId' });
};

module.exports = {
  test,
  testId,
};
