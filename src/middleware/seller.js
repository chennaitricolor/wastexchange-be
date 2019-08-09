const models = require('../models');

const { logger } = require('../lib');

const { userDetails } = models;

// This middleware check whether the token belongs to the seller mentioned in URL path
function verifySeller(req, res, next) {
  const sellerId = req.params.sellerId;

  userDetails
    .findOne({
      where: {
        id: sellerId,
        persona: 'seller',
      },
    })
    .then((seller) => {
      if (req.userId != seller.id) {
        return res.status(401).send('Unauthorized access');
      }
      req.seller = seller;
      next();
    })
    .catch((err) => {
      logger.error(`Error while verifying seller: ${err.message} ${err.stack}`);
      return res.status(500).send(err.message);
    });
}

// This middleare just checks whether the sellerId mentioned in post body has persona seller
function getSeller(req, res, next) {
  const sellerId = req.body.sellerId;

  userDetails
    .findOne({
      where: {
        id: sellerId,
        persona: 'seller',
      },
    })
    .then((seller) => {
      if (!seller) {
        return res.status(400).send('Invalid seller Id');
      }
      req.seller = seller;
      next();
    })
    .catch((err) => {
      logger.error(`Error while checking isSeller: ${err.message} ${err.stack}`);
      return res.status(500).send(err.message);
    });
}

module.exports = {
  verifySeller,
  getSeller,
};
