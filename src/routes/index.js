const {
  health, UserDetails, verifyToken, Items, Bids, Otp,
} = require('../service');

const {
  verifyBuyer, verifySeller, verifyBid, isBuyer, getSeller,
} = require('../middleware');

module.exports = (app) => {
  app.use('/health', health);
  app.post('/users/register', UserDetails.create); // API route for user to signup
  app.post('/users/login', UserDetails.login);
  app.post('/users/sendOtp', Otp.create);
  app.put('/users/:id/approve', verifyToken, UserDetails.approve);
  app.get('/users/me', verifyToken, UserDetails.getUserIdByToken);
  // TODO: Do we need a userId for this if we have the token already.
  app.put('/users/:id', verifyToken, UserDetails.modify); // API route for user to edit a detail
  // TODO: Do we need a userId for this if we have the token already.
  app.delete('/users/:id', verifyToken, UserDetails.delete);
  // TODO: Do we need a userId for this if we have the token already.
  app.get('/users/:id', verifyToken, UserDetails.getUserDetailById);
  app.get('/users', UserDetails.list);

  // userdetails
  // app.post('/users/:userId/userdetails', UserDetails.create); // API route for user to create  details
  // app.get('/userdetails', UserDetails.list); // API route for user to get all details in the database
  // app.get('/users/:userId/userdetails', UserDetails.getUserDetailsByUserId);
  // app.put('/userdetails/:detailsId', UserDetails.modify); // API route for user to edit a detail
  // app.delete('/userdetails/:detailsId', UserDetails.delete);
  // app.get('/userdetails/:detailsId', UserDetails.getUserDetailByDetailId);

  // items
  app.post('/seller/:sellerId/items', verifyToken, Items.create);
  app.get('/items', verifyToken, Items.list);
  app.get('/seller/:sellerId/items', Items.getItemBySellerId); // TODO: [STYLE] Can this be changed to only a filter (query param) on the index call?
  app.get('/items/:itemId', verifyToken, Items.getItemById);
  app.put('/items/:itemId', verifyToken, Items.modify);
  app.delete('/items/:itemId', verifyToken, Items.delete);

  // bids
  app.post('/buyer/:buyerId/bids', verifyToken, verifyBuyer, getSeller, Bids.create);
  app.get('/bids', verifyToken, Bids.list);
  app.get('/buyer/:buyerId/bids', verifyToken, Bids.getItemByBuyerId); // TODO: [STYLE] Can this be changed to only a filter (query param) on the index call?
  app.get('/bids/:bidId', verifyToken, Bids.getBidById);
  app.put('/bids/:bidId', verifyToken, verifyBid, Bids.modify);
  app.delete('/bids/:bidId', verifyToken, verifyBid, Bids.delete);
};
