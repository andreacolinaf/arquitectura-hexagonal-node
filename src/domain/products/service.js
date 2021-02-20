function init({
    productsRepository
}) {
    async function findById({ id }) {
        const product = await productsRepository.getProduct({ id });
        return {
            product
        };
    }

    async function findAllProducts() {
        return await postsRepository.findAll();
    }

    async function deleteById({ id }) {
        const product = await productsRepository.deleteById({ id });
        return {
            product
        };
    }

    async function create({
        name,
        description
    }) {
        return await postsRepository.create({ name, description });
    }

    return {
        findById,
        findAllProducts,
        deleteById,
        create
    }
}

module.exports.init = init;