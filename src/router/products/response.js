class ProductResponse {
    constructor({ id, name, description } = {}) {
      console.log('ProductResponse: ', id, name, description);

      this.id = id;
      this.name = name;
      this.description = description;
    }
  }
  
  module.exports = ProductResponse;