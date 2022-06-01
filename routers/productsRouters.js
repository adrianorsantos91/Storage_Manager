const express = require('express');

const productsControllers = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', productsControllers.test);

router.get('/:id', productsControllers.testId);

module.exports = router;
