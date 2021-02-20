const productSchema = require('./Product');

module.exports.create = mongoose => ({
  Product: productSchema(mongoose)
});