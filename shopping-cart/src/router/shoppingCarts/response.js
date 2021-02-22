class ShoppingCartResponse {
    constructor({ id, state, products } = {}) {
      this.id = id;
      this.state = state;
      this.products = products;
    }
  }
  
  module.exports = ShoppingCartResponse;