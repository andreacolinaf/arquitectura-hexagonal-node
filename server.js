const productsRepositoryContainer = require('./src/data/repositories/products');
const productsServiceContainer = require('./src/domain/products/service');
const appContainer = require('./src/router/app')
const db = require('./src/data/infrastructure/db')({dbConnectionString: 'mongodb://127.0.0.1:27017/shopping-cart'});

const productsRepository = productsRepositoryContainer.init(db.schemas);

const productsService = productsServiceContainer.init({ productsRepository });

const app = appContainer.init({ productsService });

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
