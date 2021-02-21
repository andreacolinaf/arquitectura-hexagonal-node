let express = require('express');
const mongoose = require('mongoose');
const schemasFactory = require('./data/infrastructure/db/schemas');
const schemas = schemasFactory.create(mongoose);

const productRepositoryContainer = require('./data/repositories/products');
const productServiceContainer = require('./domain/products/service');
const shoppingCartRepositoryContainer = require('./data/repositories/shoppingCarts');
const shoppingCartServiceContainer = require('./domain/shoppingCarts/service');
const shoppingCartValidator = require('./external/services/validateShoppingCart');

const productRepository = productRepositoryContainer.init(schemas);
const productService = productServiceContainer.init({ productRepository });

const shoppingCartRepository = shoppingCartRepositoryContainer.init(schemas);
const shoppingCartService = shoppingCartServiceContainer.init({ shoppingCartRepository, productRepository });


let productRouter = require('./router/products/routes');
let shoppingCartRouter = require('./router/shoppingCarts/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products', productRouter.init({ productService, shoppingCartService, shoppingCartValidator }));
app.use('/api/shoppingcarts', shoppingCartRouter.init({ productService, shoppingCartService, shoppingCartValidator }));

module.exports = app;