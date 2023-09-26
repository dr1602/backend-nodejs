// vamos a usar programacion orientada a objetos

const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        adjective: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        isBlock: faker.datatype.boolean(), //para que ciertos productosno se puedan ver.
      });
    };
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    // const name = this.getTotal();
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
    // curso de manipulacion de arrays para su manipulacion, incluso el find
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    } // si no encuentra el id, nos manda un error.
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductService;
