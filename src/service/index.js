const health = require('./health');
const UserMeta = require('./user');
const UserDetails = require('./userDetails');
const verifyToken = require('./VerifyToken');
const Items = require('./Items');
const Bids = require('./bids');
const Otp = require('./otp');
module.exports = {
  UserDetails,
  health,
  UserMeta,
  verifyToken,
  Items,
  Bids,
  Otp
};
