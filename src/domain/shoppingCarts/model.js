class ShoppingCart {
    constructor({ _id, products } = {}) {
        this.id = _id;
        this.products = products;
    }
}

module.exports = ShoppingCart;
