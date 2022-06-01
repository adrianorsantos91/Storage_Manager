const express = require('express');

const router = express.Router();

router.get('/product/', async (req, res) => {
  res.status(200).json({ message: 'teste' });
});

router.get('/product/:id', async (req, res) => {
  res.status(200).json({ message: 'teste' });
});

module.exports = router;
