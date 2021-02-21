const express = require('express');
const { toResponseModel } = require('./mapper');

const router = new express.Router();

function init({ shoppingCartService }) {

    router.post('/', async (req, res) => {
        const shoppingCart = await shoppingCartService.create();
        
        return res.send(toResponseModel(shoppingCart));
    });

    router.post('/:cart_id/products/:prod_id/quantity/:prod_quantity', async (req, res) => {
        const shoppingCart = await shoppingCartService.addProductWithQuantity({
            shoppingCart: req.params.cart_id,
            product: req.params.prod_id,
            quantity: req.params.prod_quantity });

        return res.send(toResponseModel(shoppingCart));
    })

    router.patch('/:cart_id', async (req, res) => {
        const shoppingCart = await shoppingCartService.finalize({ shoppingCart: req.params.cart_id });
        return res.send(toResponseModel(shoppingCart));
    })

    router.get('/:cart_id', async (req, res) => {
        const shoppingCart = await shoppingCartService.get({ shoppingCart: req.params.cart_id });
        return res.send(toResponseModel(shoppingCart));
    })

    router.delete('/:cart_id', async (req, res) => {
        const shoppingCart = await shoppingCartService.remove({ shoppingCart: req.params.cart_id });
        return res.send(toResponseModel(shoppingCart));
    })

    router.delete('/:cart_id/products/:prod_id', async (req, res) => {
        const shoppingCart = await shoppingCartService.removeProduct({
            shoppingCart: req.params.cart_id,
            product: req.params.prod_id });
        return res.send(toResponseModel(shoppingCart));
    })
    
    return router;
}

module.exports.init = init;