const express = require('express');
const { toResponseModel } = require('./response');

const router = new express.Router();

function init({ productService }) {
    router.get('/:id', async (req, res) => {
        const product = await productService.findById({
            id: req.params.id,
        });
        return res.send({
            data: Object.assign({},
                toResponseModel(product))
        });
    });

    router.post('/', async (req, res) => {
        const product = await productService.create({
            name: req.params.name,
            description: req.params.description
        });
        return res.send({ data: product });
    });

    //TODO: completar el resto de endpoint: PRODUCT getall, delete

    return router;
}

module.exports.init = init;