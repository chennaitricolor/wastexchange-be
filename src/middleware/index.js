const buyer = require('./buyer');
const seller = require('./seller');
const verifyBid = require('./bid');

module.exports = {
  getBuyer: buyer.getBuyer,
  getSeller: seller.getSeller,
  verifyBuyer: buyer.verifyBuyer,
  verifySeller: seller.verifySeller,
  verifyBid,
};
