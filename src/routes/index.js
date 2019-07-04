const {
  health,
  UserMeta,
  UserDetails
} = require('../service');

module.exports = (app) => {
  app.use('/health', health);
  app.post('/users', UserMeta.signUp); // API route for user to signup
  app.post('/users/:userId/userdetails', UserDetails.create); // API route for user to create  details
  app.get('/userdetails', UserDetails.list); // API route for user to get all details in the database
  app.put('/userdetails/:detailsId', UserDetails.modify); // API route for user to edit a detail
  app.delete('/userdetails/:detailsId', UserDetails.delete); 
  
};
