function init({ shoppingCartRepository, productRepository }) {

    async function create() {
        return await shoppingCartRepository.create();
    }

    async function addProductWithQuantity({ shoppingCart, product, quantity }) {
        const shoppingCartFound = await shoppingCartRepository.get({ shoppingCart });
        
        const productFound = await productRepository.getProduct({ id : product });

        const productToAdd = {
            id: productFound.id,
            quantity: quantity
        }

        const shoppingCartProduct = shoppingCartFound.products.filter(item => item.product == product)[0];
        let savedShoppingCart;
        if (shoppingCartProduct) {
            savedShoppingCart = await shoppingCartRepository.updateExistingProduct({ shoppingCart, product: productToAdd });
        } else {
            savedShoppingCart = await shoppingCartRepository.updateUnexistingProduct({ shoppingCart, product: productToAdd });
        }
        return savedShoppingCart;
    }

    async function get({ shoppingCart }) {
        return await shoppingCartRepository.get({ shoppingCart });
    }

    async function finalize({ shoppingCart }) {
        return await shoppingCartRepository.finalize({ shoppingCart });
    }

    async function remove({ shoppingCart }) {
        return await shoppingCartRepository.remove({ shoppingCart });
    }

    async function removeProduct({ shoppingCart, product }) {
        return await shoppingCartRepository.removeProduct({ shoppingCart, product });
    }

    return {
        create,
        addProductWithQuantity,
        get,
        finalize,
        remove,
        removeProduct
    }
}

module.exports.init = init;