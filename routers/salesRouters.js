const express = require('express');

const salesControllers = require('../controllers/salesControllers');

const router = express.Router();

router.get('/:id', salesControllers.getById);
router.get('/', salesControllers.getAll);

module.exports = router;
