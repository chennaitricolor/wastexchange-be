const models = require('../models');

const { logger } = require('../lib');

const { userDetails } = models;

function verifyBuyer(req, res, next) {
  const buyerId = req.params.buyerId;

  userDetails
    .findOne({
      where: {
        id: buyerId,
        persona: 'buyer',
      },
    })
    .then((buyer) => {
      if (req.userId != buyer.id) {
        return res.status(401).send('Unauthorized access');
      }
      req.buyer = buyer;
      next();
    })
    .catch((err) => {
      logger.error(`Error while verifying buyer: ${err.message} ${err.stack}`);
      return res.status(500).send(err.message);
    });
}

function getBuyer(req, res, next) {
  const buyerId = req.body.buyerId;

  userDetails
    .findOne({
      where: {
        id: buyerId,
        persona: 'buyer',
      },
    })
    .then((buyer) => {
      if (!buyer) {
        return res.status(400).send('Invalid buyer Id');
      }
      req.buyer = buyer;
      next();
    })
    .catch((err) => {
      logger.error(`Error while checking isBuyer: ${err.message} ${err.stack}`);
      return res.status(500).send(err.message);
    });
}

module.exports = {
  verifyBuyer,
  getBuyer,
};
