class ShoppingCartResponse {
    constructor({ id, products } = {}) {
      console.log('ShoppingCartResponse: ', id, products);

      this.id = id;
      this.products = products;
    }
  }
  
  module.exports = ShoppingCartResponse;