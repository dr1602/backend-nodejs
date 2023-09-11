const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      adjective: faker.commerce.productAdjective(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price(), 10),
    });
  };
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // podemos hacer destructuracion de parametros
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  });
});

module.exports = router;
