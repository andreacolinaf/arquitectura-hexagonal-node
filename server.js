const productRepositoryContainer = require('./src/data/repositories/products');
const productServiceContainer = require('./src/domain/products/service');
const shoppingCartRepositoryContainer = require('./src/data/repositories/shoppingCarts');
const shoppingCartServiceContainer = require('./src/domain/shoppingCarts/service');
const shoppingCartValidator = require('./src/external/services/validateShoppingCart');
const appContainer = require('./src/router/app')
const db = require('./src/data/infrastructure/db')({dbConnectionString: 'mongodb://127.0.0.1:27017/shopping-cart'});

const productRepository = productRepositoryContainer.init(db.schemas);
const productService = productServiceContainer.init({ productRepository });

const shoppingCartRepository = shoppingCartRepositoryContainer.init(db.schemas);
const shoppingCartService = shoppingCartServiceContainer.init({ shoppingCartRepository, productRepository });

const app = appContainer.init({ productService, shoppingCartService, shoppingCartValidator });

let server = app.listen('3000', () => {
  console.log('App listening on port 3000!');
});

(async () => {
  try {
    await db.connect();
  } catch (error) {
    await db.close();
    await server.close();
  }
})();
