const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const { validateSalesMiddleware } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/:id', salesControllers.getById);
router.get('/', salesControllers.getAll);
router.post('/', validateSalesMiddleware, salesControllers.create);
router.put('/:id', validateSalesMiddleware, salesControllers.updateById);

module.exports = router;
