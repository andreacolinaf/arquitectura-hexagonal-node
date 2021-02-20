function create(mongoose) {
  const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
  });

  return mongoose.model('Product', productSchema);
}

module.exports = create;
