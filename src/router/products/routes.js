const express = require('express');
const { toResponseModel } = require('./mapper');

const router = new express.Router();

function init({ productService }) {

    router.get('/', async (req, res) => {
        const doc = await productService.findAllProducts();
        return res.send({ "products": doc.map(product => toResponseModel(product))});
    });

    router.get('/:id', async (req, res) => {
        const product = await productService.findById({ id: req.params.id });
        return res.send(toResponseModel(product));
    });

    router.post('/', async (req, res) => {
        const product = await productService.create({
            name: req.body.name,
            description: req.body.description
        });
        return res.send(product);
    });

    router.delete('/:id', async (req, res) => {
        const product = await productService.deleteById({ id: req.params.id });
        return res.send(toResponseModel(product));
    })
    
    return router;
}

module.exports.init = init;