class ShoppingCartResponse {
    constructor({ id, products } = {}) {
      this.id = id;
      this.products = products;
    }
  }
  
  module.exports = ShoppingCartResponse;