const {
  health,
  UserMeta,
  UserDetails,
  verifyToken,
  Items,
  Bids,
  Otp
} = require('../service');

module.exports = (app) => {
  app.use('/health', health);
  app.post('/users/register', UserMeta.signUp); // API route for user to signup
  app.post('/users/login', UserMeta.login); 
  app.post('/users/sendOtp', Otp.create); 
  app.get('/users/me', verifyToken, UserMeta.getUserIdByToken);


  //userdetails
  app.post('/users/:userId/userdetails', UserDetails.create); // API route for user to create  details
  app.get('/userdetails', UserDetails.list); // API route for user to get all details in the database
  app.get('/users/:userId/userdetails', UserDetails.getUserDetailsByUserId);
  app.put('/userdetails/:detailsId', UserDetails.modify); // API route for user to edit a detail
  app.delete('/userdetails/:detailsId', UserDetails.delete); 
  app.get('/userdetails/:detailsId', UserDetails.getUserDetailByDetailId); 

//items 
  app.post('/seller/:sellerId/items', Items.create); 
  app.get('/items', Items.list);
  app.get('/seller/:sellerId/items', Items.getItemBySellerId); 
  app.get('/items/:itemId', Items.getItemById); 
  app.put('/items/:itemId', Items.modify); 
  app.delete('/items/:itemId', Items.delete); 



//bids 
app.post('/buyer/:buyerId/bids', Bids.create); 
app.get('/bids', Bids.list);
app.get('/buyer/:buyerId/bids', Bids.getItemByBuyerId); 
app.get('/bids/:bidId', Bids.getbidById); 
app.put('/bids/:bidId', Bids.modify); 
app.delete('/bids/:bidId', Bids.delete); 
  
};
