const express = require('express');

const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    category: 'Artesanias'
  });
});

module.exports = router;
