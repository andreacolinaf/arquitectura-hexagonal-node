const mapper = require('../../mapper');
const ShoppingCartDomainModel = require('../../../domain/shoppingCarts/model');

const shoppingCartStore = {

    async createShoppingCart() {
        try {
            const { ShoppingCart : shoppingCartSchema } = this.getSchemas();
            const shoppingCart = new shoppingCartSchema({ });
            const savedCart = await shoppingCart.save();
            return mapper.toDomainModel(savedCart, ShoppingCartDomainModel);
        } catch (e) {
            throw e;
        }
    },

    async updateExistingProductShoppingCart(params) {
        try {
            const { ShoppingCart : shoppingCartSchema } = this.getSchemas();

            const updatedShoppingCart = await shoppingCartSchema.findOneAndUpdate(
                { _id: params.shoppingCart, "products.product": mapper.toObjectId(params.product.id) },
                { $set: { "products.$.quantity": params.product.quantity }});
            return mapper.toDomainModel(updatedShoppingCart, ShoppingCartDomainModel);
        } catch (e) {
            throw e;
        }
    },

    async updateUnexistingProductShoppingCart(params) {
        try {
            const { ShoppingCart : shoppingCartSchema } = this.getSchemas();

            const updatedShoppingCart = await shoppingCartSchema.findOneAndUpdate(
                { _id: params.shoppingCart },
                { $push: { "products": { product: mapper.toObjectId(params.product.id), quantity: params.product.quantity } }});
            return mapper.toDomainModel(updatedShoppingCart, ShoppingCartDomainModel);
        } catch (e) {
            throw e;
        }
    },

    async getShoppingCart(params) {
        try {
            const { ShoppingCart : shoppingCartSchema } = this.getSchemas();
            let shoppingCart = await shoppingCartSchema.findOne({ _id: params.shoppingCart });
            if (!shoppingCart) {
                throw new Error('Shopping cart not found');
            }
            return mapper.toDomainModel(shoppingCart, ShoppingCartDomainModel);
        } catch (e) {
            throw e;
        }
    }
};

module.exports.init = ({ ShoppingCart, Product }) => Object.assign(Object.create(shoppingCartStore), {
    getSchemas() { return { ShoppingCart, Product }; }
});