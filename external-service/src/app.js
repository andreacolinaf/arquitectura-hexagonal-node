let express = require('express');
let validationRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/external/validation', validationRouter.router);

module.exports = app;