var express = require('express');

var productRouter = require('./src/router/products/routes');
const http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/productRouter', productRouter);

module.exports.init = (services) => {
  app.use('/products', productRouter.init(services));
  const httpServer = http.createServer(app);
  return httpServer;
};

