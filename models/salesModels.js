const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM sales');

const getById = (id) => connection.execute('SELECT * FROM sales WHERE id = ?', [id]);

module.exports = {
  getAll,
  getById,
};
