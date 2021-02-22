function create(mongoose) {

  const productSubschema = mongoose.Schema({
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      }
    }, {
      _id: false
  });

  const shoppingCartSchema = mongoose.Schema({
      state: {
        type: String
      },
      products: [productSubschema],
    },
    {
      usePushEach: true,
  });

  return mongoose.model('ShoppingCart', shoppingCartSchema);
}

module.exports = create;
