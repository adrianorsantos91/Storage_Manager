const express = require('express');

const productsControllers = require('../controllers/productsControllers');

const router = express.Router();

router.get('/:id', productsControllers.getById);
router.get('/', productsControllers.getAll);

module.exports = router;
