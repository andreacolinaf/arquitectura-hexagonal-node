class ShoppingCart {
    constructor({ _id, state, products } = {}) {
        this.id = _id;
        this.state = state;
        this.products = products;
    };

    static get STATES() {
        return {
            INITIAL: 'INITIAL',
            IN_PROGRESS: 'IN_PROGRESS',
            FINAL: 'FINAL'
        }
    };
}

module.exports = ShoppingCart;
