const express = require('express');

const router = new express.Router();

router.get('/', async (req, res) => {
    
    return res.send({ valid: Math.random() < 0.5 });
});

module.exports.router = router;