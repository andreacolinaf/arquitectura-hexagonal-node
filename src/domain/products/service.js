function init({ productRepository }) {
    
    async function findById({ id }) {
        return await productRepository.getProduct({ id });
    }

    async function findAllProducts() {
        return await productRepository.findAll();
    }

    async function deleteById({ id }) {
        return await productRepository.deleteById({ id });
    }

    async function create({ name, description }) {
        return await productRepository.createProduct({ name, description });
    }

    return {
        findById,
        findAllProducts,
        deleteById,
        create
    }
}

module.exports.init = init;