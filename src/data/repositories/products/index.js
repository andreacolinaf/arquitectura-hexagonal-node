const mapper = require('../../mapper');
const ProductDomainModel = require('../../../domain/products/model');

const productStore = {
    async createProduct(params) {
        try {
            const { Product : productSchema } = this.getSchemas();
            const product = new productSchema({
                name: params.name,
                description: params.description,
            });
            const savedProduct = await product.save();
            return mapper.toDomainModel(savedProduct, ProductDomainModel);
        } catch (error) {
            throw error;
        }
    },

    async getProduct(params) {
        try {
            const { Product : productSchema } = this.getSchemas();
            const product = await productSchema.findOne({_id : params.id});
            if(!product) {
                throw new Error('Product not found');
            }
            return mapper.toDomainModel(product, ProductDomainModel);
        } catch (error) {
            throw error;
        }
    },

    async findAll() {
        try {
            const { Product : productSchema } = this.getSchemas();
            const products = await productSchema.find();
            return products.map(product => mapper.toDomainModel(product, ProductDomainModel));
        } catch (error) {
            throw error;
        }
    },

    async deleteById(params) {
        try {
            const { Product : productSchema } = this.getSchemas();
            const product = await productSchema.findOne({ _id: params.id });
            if(!product) {
                throw new Error('Product not found');
            }
            await productSchema.deleteOne({ _id: params.id });
            return mapper.toDomainModel(product, ProductDomainModel);
        } catch (error) {
            throw error;
        }
    }
};

module.exports.init = ({ Product }) => Object.assign(Object.create(productStore), {
    getSchemas() {
      return {
        Product,
      };
    },
  });