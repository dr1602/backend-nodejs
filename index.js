const express = require('express');
const { faker } = require('@faker-js/faker');

const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { restart } = require('nodemon');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.get('/products', (req, res) => {
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

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter')
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset ) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros.');
  }
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params; // podemos hacer destructuracion de parametros
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: 1,
    name: 'Juanito'
  },{
    id: 2,
    name: 'Maria'
  },{
    id: 3,
    name: 'Benito'
  },{
    id: 4,
    name: 'Allison'
  }
  )
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    category: 'Artesanias'
  })
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
