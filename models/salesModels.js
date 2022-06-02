const connection = require('./connection');

const getAll = () => connection.execute(
  `SELECT
    id,
    date,
    product_id,
    quantity
  FROM StoreManager.sales, StoreManager.sales_products
  WHERE id = sale_id
  ORDER BY sales.id`,
);

const getById = (id) => connection.execute(
  `SELECT
    id,
    date,
    product_id,
    quantity
  FROM StoreManager.sales, StoreManager.sales_products
  WHERE id = sale_id AND id = ?
  ORDER BY sales.id`, [id],
);

module.exports = {
  getAll,
  getById,
};
