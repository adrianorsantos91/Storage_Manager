const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM products');

const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

module.exports = {
  getAll,
  getById,
};
