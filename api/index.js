const express = require('express');
const cors = require('cors');
const routerApi = require('../api/routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { required } = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', , 'http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

// los middlewares se tienen que hacer despues de definir el routing, ene el orden en que se pongan, es el orden en que se ejecutan.
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' +  port);
});

