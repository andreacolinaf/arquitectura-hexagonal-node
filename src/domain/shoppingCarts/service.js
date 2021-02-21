function init({ shoppingCartRepository, productRepository }) {

    async function create() {
        return await shoppingCartRepository.createShoppingCart();
    }

    async function addProductWithQuantity({ shoppingCart, product, quantity }) {
        const shoppingCartFound = await shoppingCartRepository.getShoppingCart({ shoppingCart, product, quantity });
        
        const productFound = await productRepository.getProduct({ id : product });

        const productToAdd = {
            id: productFound.id,
            quantity: quantity
        }

        const shoppingCartProduct = shoppingCartFound.products.filter(item => item.product == product)[0];
        let savedShoppingCart;
        if (shoppingCartProduct) {
            savedShoppingCart = await shoppingCartRepository.updateExistingProductShoppingCart({ shoppingCart, product: productToAdd })
            savedShoppingCart.products.filter(item => item.product == product)[0].quantity = quantity;
        } else {
            savedShoppingCart = await shoppingCartRepository.updateUnexistingProductShoppingCart({ shoppingCart, product: productToAdd });
            savedShoppingCart.products.push({
                product: productToAdd.id,
                quantity: productToAdd.quantity
            });
        }
        return savedShoppingCart;
    }

    return {
        create,
        addProductWithQuantity
    }
}

module.exports.init = init;