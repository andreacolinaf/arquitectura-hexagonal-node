function init({ shoppingCartRepository }) {

    async function create() {
        return await shoppingCartRepository.createShoppingCart();
    }

    return {
        create
    }
}

module.exports.init = init;