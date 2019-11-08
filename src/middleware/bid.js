const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('../models');

const { logger } = require('../lib');

const { bids, userDetails } = models;

async function verifyBid(req, res, next) {
  const bidId = req.params.bidId;
  const bidQuery = {
    where: {
      id: bidId,
    },
  };

  if (req.isBuyer) {
    bidQuery.where.buyerId = req.userId;
  }

  if (req.isSeller) {
    bidQuery.where.sellerId = req.userId;
  }

  try {
    const bid = await bids.findOne(bidQuery);
    if (!bid) {
      return res.status(401).send('Please provide a valid bid Id');
    }

    const users = await userDetails.findAll({
      where: {
        id: {
          [sequelize.Op.in]: [bid.sellerId, bid.buyerId],
        },
      },
    });
    req.buyer = _.find(users, { persona: 'buyer' });
    req.seller = _.find(users, { persona: 'seller' });

    if (_.isEmpty(req.buyer)) {
      return res.status(401).send('Please provide a valid buyer Id');
    }

    if (_.isEmpty(req.seller)) {
      return res.status(401).send('Please provide a seller buyer Id');
    }

    next();
  } catch (err) {
    logger.error(`Error while verifying bid ownership: ${err.message} ${err.stack}`);
    return res.status(500).send(err.message);
  }
}

module.exports = verifyBid;
