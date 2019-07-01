
const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const routes = require('./routes');
const { logger } = require('./lib');

const app = express();

const port = process.env.PORT || 7000;

app.use(bodyParser.json({
  limit: '50mb',
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
}));
app.use(cookieParser());
app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));

const swaggerDefinition = {
  info: {
    title: 'Waste Management Service',
    version: '1.0.0-PreRelease',
    description: 'Waste Management Service',
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '/service/*.js')],
};

app.get('/swagger.json', (req, res) => {
  try {
    const swaggerSpec = swaggerJSDoc(options);
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  } catch (err) {
    logger.error('Error in generating Swagger');
  }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// app.use(morgan('combined'));

routes(app);

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.stack}`);
  if (res.headersSent) {
    next(err);
    return;
  }
  res.sendStatus(500);
};

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, (err) => {
    if (err) {
      logger.error(`${err.stack}`);
      return;
    }
    logger.info(`Listening on port ${port}`);
  });
}

/**
 * @description
 * Uncaught exceptions are logged here before terminating the application.
 * Resuming the application at this point is not safe.
 * @see https://nodejs.org/api/process.html#process_event_uncaughtexception
 * @see https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
process.on('uncaughtException', (err) => {
  logger.error(`uncaughtException :: ${err.stack}`);
  process.exit(1);
});

/**
 * @description
 * Unhandled Promise Rejection is deprecated. In the future release it will
 * terminate the application just like uncaught exceptions and hence it will
 * make the migration to later versions of Node.js 'painful'.
 * @see https://nodejs.org/api/process.html#process_event_unhandledrejection
 */
process.on('unhandledRejection', (reason) => {
  logger.error(`unhandledRejection :: ${reason.stack || reason}`);
  process.exit(1);
});

module.exports = app;
