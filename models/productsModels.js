const connection = require('../db/connection');

const getAll = () => connection.execute('SELECT * FROM products');

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

const updateById = (id, name, quantity) => connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
);

const deleteById = (id) => connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
);

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
