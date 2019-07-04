const {
  health,
  Seller,
  Buyer
} = require('../service');

module.exports = (app) => {
  app.use('/health', health);
  app.post('/seller', Seller.signUp);
  app.post('/buyer', Buyer.signUp);
};
