const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
  constructor() {
    super('author');
  }

  async findAll(){
    const authors = await super.findAll();
    return authors;
  }

  async findById(id){
    const authors = await super.findById(id);
    return authors;
  }

}

module.exports = AuthorModel;

