const express = require('express');
const { toResponseModel } = require('./mapper');

const router = new express.Router();

function init({ productService }) {
    router.get('/:id', async (req, res) => {
        const doc = await productService.findById({
            id: req.params.id,
        });
        return res.send(toResponseModel(doc.product));
    });

    router.post('/', async (req, res) => {
        console.log('Request body: ', req.body);
        console.log('productService', productService);
        const product = await productService.create({
            name: req.body.name,
            description: req.body.description
        });
        return res.send(product);
    });

    //TODO: completar el resto de endpoint: PRODUCT getall, delete

    return router;
}

module.exports.init = init;