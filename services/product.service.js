// vamos a usar programacion orientada a objetos

const { faker } = require('@faker-js/faker');

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
      });
    };
  }

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
    // curso de manipulacion de arrays para su manipulacion, incluso el find
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductService;
