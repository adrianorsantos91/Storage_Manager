const express = require('express');

const productsControllers = require('../controllers/productsControllers');
const { validateNameProductsMiddleware,
  validateQuantityProductsMiddleware } = require('../middlewares/productMiddleware');

const router = express.Router();

router.get('/', productsControllers.getAll);
router.get('/:id', productsControllers.getById);
router.post('/', validateNameProductsMiddleware,
validateQuantityProductsMiddleware, productsControllers.create);

module.exports = router;
