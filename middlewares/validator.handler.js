const boom = require('@hapi/boom');

function validatorHandler( schema, property ) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
  // este es un caso de uso para un closure
}

module.exports = validatorHandler
;

// middleware dinamico para evaluar de cada request de una propiedad en especifico, como el body, params o query, sacar el request esa infromacion ese schema.
