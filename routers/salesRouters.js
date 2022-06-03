const express = require('express');
const salesControllers = require('../controllers/salesControllers');
// const { validateProductIdSalesMiddleware,
//   validateQuantitySalesMiddleware } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/:id', salesControllers.getById);
router.get('/', salesControllers.getAll);
// router.post('/', validateProductIdSalesMiddleware,
// validateQuantitySalesMiddleware, salesControllers.create);

module.exports = router;
