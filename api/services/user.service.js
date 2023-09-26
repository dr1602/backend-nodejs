const { faker } = require('@faker-js/faker');

class UserServices {

  constructor() {
    this.user = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.user.push({
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
      });
    };
  }

  find() {
    return this.user;
  }

  findOne(id) {
    return this.user.find(item => item.id === id);
  }

  update(id, changes) {
    const index = this.user.findIndex(item => item.ide === id);
    if(index === -1){
      throw new Error('user not found');
    }
    const user = this.user[index];
    this.user[index] = {
      ...user,
      ...changes
    };
    return this.user[index];
  }

  delete(id) {
    const index = this.user.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    }
    this.user.splice(index, 1);
    return { id };
  }

}

module.exports = UserServices;
