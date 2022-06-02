const connection = require('./connection');

const getAll = () => {
  console.log('teste');
  return connection.execute('SELECT * FROM products');
};

const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
