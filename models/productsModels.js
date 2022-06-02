const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM products');

module.exports = {
  getAll,
};
