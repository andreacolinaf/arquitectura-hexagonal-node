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
    }
};

module.exports.init = ({ ShoppingCart }) => Object.assign(Object.create(shoppingCartStore), {
    getSchemas() { return { ShoppingCart }; }
});