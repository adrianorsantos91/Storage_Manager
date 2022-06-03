const connection = require('./connection');

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

const updateById = async (id, name, quantity) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
    );
    return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
};
