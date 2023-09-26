// tambien se puede llamar dto, data transfer object

const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

// validar creacion de un producto
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

// validar actualizacion de un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

//validar get de un producto
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
