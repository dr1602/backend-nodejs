const express = require('express');

const CategoriesServices = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesServices();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
})

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    messsage: 'created',
    data: body,
  });
});

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

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
