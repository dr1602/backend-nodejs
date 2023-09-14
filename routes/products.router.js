const express = require('express');

const ProductService = require('./../services/product.service');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
});

router.get('/:id', async (req, res,next) => {
  try{
    const { id } = req.params; // podemos hacer destructuracion de parametros
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }

});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
