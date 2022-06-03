const express = require('express');

const productsControllers = require('../controllers/productsControllers');
const { validateNameProductsMiddleware,
  validateQuantityProductsMiddleware } = require('../middlewares/productMiddleware');

const router = express.Router();

router.get('/:id', productsControllers.getById);
router.get('/', productsControllers.getAll);
router.post('/', validateNameProductsMiddleware,
validateQuantityProductsMiddleware, productsControllers.create);
router.put('/:id', validateNameProductsMiddleware,
validateQuantityProductsMiddleware, productsControllers.updateById);
router.delete('/:id', productsControllers.deleteById);

module.exports = router;
