const ProductResponse = require('./response');

const toResponseModel = function toResponseModel(productDoc) {
  return new ProductResponse({ ...productDoc });
};

module.exports = {
  toResponseModel,
};