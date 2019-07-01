const {
  health,
} = require('../service');

module.exports = (app) => {
  app.use('/health', health);
};
