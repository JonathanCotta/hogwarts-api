const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const consign = require('consign');

const config = require('./config');

require('./database');

module.exports = () => {
  const app = express();

  // server port configuration
  app.set('port', config.PORT);

  // Log configuration
  app.use(morgan(config.ENV));

  // request middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // security
  app.use(helmet());
  app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.5.14' }));
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.disable('x-powered-by');

  // route loader
  consign({
    cwd: 'src',
    verbose: true,
    extensions: ['.js'],
  })
    .include('routes')
    .into(app);



  return app;
};
