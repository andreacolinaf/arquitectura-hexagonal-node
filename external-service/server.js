const app = require('./src/app')

const server = app.listen('3001', () => {
  console.log('App listening on port 3001!');
});
