var express = require('express');

var productRouter = require('./products/routes');
const http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports.init = (services) => {
  app.use('/products', productRouter.init(services));
  const httpServer = http.createServer(app);
  return httpServer;
};

