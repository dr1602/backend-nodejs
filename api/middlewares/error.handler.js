const { func } = require("joi");

// middleware para loggear errores
function logErrors (err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err); // de tipo error, al enviar error, sino seria un next normal.
} // por ahora es error de consola, pero lo podemos juntar con sistemas de tracking

// para crear un standard de formato al error.
function errorHandler(err, req, res, next) { // aunque no usemos next, lo debemos de poner para que sepa que es un middleware de error.
  console.log('errorHandler');
  res.status(500).json({
    message: err.mesage, // para mandar mensaje
    stack: err.stack, // para saber donde ocurrio el error
  });
} // si hay un error, quiero que sea un punto final


function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output }= err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// si no agregas ELSE, el codigo produce el error: Cannot set headers after they are sent to the children.

module.exports = { logErrors, errorHandler, boomErrorHandler }
