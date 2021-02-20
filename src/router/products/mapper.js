const ProductResponse = require('./response');

const toResponseModel = function toResponseModel(productDoc) {
  console.log('productDoc: ', productDoc);

  return new ProductResponse({ ...productDoc });
};


module.exports = {
  toResponseModel,
};