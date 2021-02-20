function create(mongoose) {
    const shoppingCartSchema = mongoose.Schema({
      products: [{
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
          quantity: {
              type: Number
          }
      }]
    });
  
    return mongoose.model('ShoppingCart', shoppingCartSchema);
  }
  
  module.exports = create;
  