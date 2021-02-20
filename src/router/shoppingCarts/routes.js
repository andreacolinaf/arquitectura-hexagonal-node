const express = require('express');
const { toResponseModel } = require('./mapper');

const router = new express.Router();

function init({ shoppingCartService }) {

    router.post('/', async (req, res) => {
        const shoppingCart = await shoppingCartService.create();
        return res.send(toResponseModel(shoppingCart));
    });
    
    return router;
}

module.exports.init = init;