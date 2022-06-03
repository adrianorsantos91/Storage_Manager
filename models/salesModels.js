const connection = require('./connection');

const getAll = () => connection.execute(
  `SELECT id, date, product_id, quantity
  FROM StoreManager.sales, StoreManager.sales_products
  WHERE id = sale_id
  ORDER BY sales.id`,
);

const getById = (id) => connection.execute(
  `SELECT
    s.date,
    sl.product_id,
    sl.quantity
  FROM StoreManager.sales AS s, StoreManager.sales_products AS sl
  WHERE s.id = sl.sale_id AND s.id = ?
  ORDER BY s.id`, [id],
);

const create = async (salesData) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
  );

  const idSale = result.insertId;

  await salesData.forEach(({ productId, quantity }) => {
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [idSale, productId, quantity],
    );
  });

  return {
    id: +idSale,
    itemsSold: salesData,
  };
};

const updateById = async (id, salesData) => {
  await salesData.forEach(({ productId, quantity }) => {
    connection.execute(
      'UPDATE products SET product_id = ?, quantity = ? WHERE id = ?',
      [id, productId, quantity],
    );
  });

  return {
    id,
    itemUpdated: salesData,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
};
