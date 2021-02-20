function init({
    productRepository
}) {
    async function findById({ id }) {
        const product = await productRepository.getProduct({ id });
        return {
            product
        };
    }

    async function findAllProducts() {
        return await productRepository.findAll();
    }

    async function deleteById({ id }) {
        const product = await productRepository.deleteById({ id });
        return {
            product
        };
    }

    async function create({
        name,
        description
    }) {
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