function init({ shoppingCartRepository }) {

    async function create() {
        return await shoppingCartRepository.createShoppingCart();
    }

    async function addProductWithQuantity({ shoppingCart, product, quantity }) {
        const shoppingCartFound = await shoppingCartRepository.getShoppingCart({ shoppingCart, product, quantity });
        //const productFound = await 
        
        console.log('shoppingCartFound', shoppingCartFound);
        return shoppingCartFound;
    }

    return {
        create,
        addProductWithQuantity
    }
}

module.exports.init = init;