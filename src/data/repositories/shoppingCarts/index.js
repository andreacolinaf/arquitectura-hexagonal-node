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

    async getShoppingCart(params) {
        try {
            const { ShoppingCart : shoppingCartSchema } = this.getSchemas();
            let shoppingCart = await shoppingCartSchema.findOne({ _id: params.shoppingCart });
            if (!shoppingCart) {
                throw new Error('Shopping cart not found');
            }
            
            const product = shoppingCart.products.filter((item => item.product == params.product));

            if (product.length > 0) {
                product[0]['quantity'] = params.quantity;
                console.log('product', product);
            } else {
                const { Product : productSchema } = this.getSchemas();
                const productFound = await productSchema.findOne({ _id : params.product });
                
                if(!productFound) {
                    throw new Error('Product not found');
                }
                shoppingCart.products.push({
                    product: productFound._id,
                    quantity: params.quantity
                });
            }
            const savedShoppingCart = await shoppingCart.save();
            savedShoppingCart.populate('products.product').execPopulate();
            console.log('savedShoppingCart', savedShoppingCart.products);

            return mapper.toDomainModel(savedShoppingCart, ShoppingCartDomainModel);
        } catch (e) {
            throw e;
        }
    }
};

module.exports.init = ({ ShoppingCart, Product }) => Object.assign(Object.create(shoppingCartStore), {
    getSchemas() { return { ShoppingCart, Product }; }
});