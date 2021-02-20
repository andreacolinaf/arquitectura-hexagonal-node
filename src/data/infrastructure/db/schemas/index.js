const productSchema = require('./Product');
const shoppingCartSchema = require('./ShoppingCart');

module.exports.create = mongoose => ({
  Product: productSchema(mongoose),
  ShoppingCart: shoppingCartSchema(mongoose)
});