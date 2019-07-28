const { health, UserDetails, verifyToken, Items, Bids, Otp } = require('../service');

module.exports = app => {
  app.use('/health', health);
  app.post('/users/register', UserDetails.create); // API route for user to signup
  app.post('/users/login', UserDetails.login);
  app.post('/users/sendOtp', Otp.create);
  app.get('/users/me', verifyToken, UserDetails.getUserIdByToken);
  app.put('/users/:id', verifyToken, UserDetails.modify); // API route for user to edit a detail
  app.delete('/users/:id', verifyToken, UserDetails.delete);
  app.get('/users/:id', verifyToken, UserDetails.getUserDetailById);
  app.get('/users', UserDetails.list);

  //userdetails
  // app.post('/users/:userId/userdetails', UserDetails.create); // API route for user to create  details
  // app.get('/userdetails', UserDetails.list); // API route for user to get all details in the database
  // app.get('/users/:userId/userdetails', UserDetails.getUserDetailsByUserId);
  // app.put('/userdetails/:detailsId', UserDetails.modify); // API route for user to edit a detail
  // app.delete('/userdetails/:detailsId', UserDetails.delete);
  // app.get('/userdetails/:detailsId', UserDetails.getUserDetailByDetailId);

  //items
  app.post('/seller/:sellerId/items', verifyToken, Items.create);
  app.get('/items', verifyToken, Items.list);
  app.get('/seller/:sellerId/items', verifyToken, Items.getItemBySellerId);
  app.get('/items/:itemId', verifyToken, Items.getItemById);
  app.put('/items/:itemId', verifyToken, Items.modify);
  app.delete('/items/:itemId', verifyToken, Items.delete);

  //bids
  app.post('/buyer/:buyerId/bids', verifyToken, Bids.create);
  app.get('/bids', verifyToken, Bids.list);
  app.get('/buyer/:buyerId/bids', verifyToken, Bids.getItemByBuyerId);
  app.get('/bids/:bidId', verifyToken, Bids.getBidById);
  app.put('/bids/:bidId', verifyToken, Bids.modify);
  app.delete('/bids/:bidId', verifyToken, Bids.delete);
};
