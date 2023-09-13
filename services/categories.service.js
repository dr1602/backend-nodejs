class CategoriesServices {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {

  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1) {
      throw new Error('category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesServices;
