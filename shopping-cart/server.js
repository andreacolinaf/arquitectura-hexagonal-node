const app = require('./src/app')
const db = require('./src/data/infrastructure/db');

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
