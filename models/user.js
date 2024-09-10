const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
  constructor() {
    super('user');
  }

  async findById(id){
    const users = await super.findById(id);
    return users;
  }

  async create(user) {
    const users = await super.findMany('id', user.id)
    return users;
  }

  async create(user){
    const createdUserId = await super.create(user)
    return createdUserId;
  }

}

module.exports = UserModel;

