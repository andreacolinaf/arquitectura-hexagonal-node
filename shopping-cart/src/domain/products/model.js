class Product {
    constructor({ _id, name, description } = {}) {
        this.id = _id;
        this.name = name;
        this.description = description;
    }
}

module.exports = Product;
