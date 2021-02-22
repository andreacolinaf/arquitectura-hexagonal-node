const ShoppingCartResponse = require('./response');

const toResponseModel = function toResponseModel(shoppingCartDoc) {
  return new ShoppingCartResponse({ ...shoppingCartDoc });
};

module.exports = {
  toResponseModel
};