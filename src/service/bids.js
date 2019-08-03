const models = require('../models');

const { bids, items } = models;
const R = require('ramda');

class Bids {
  static create(req, res) {
    try {
      const {
        sellerId, pDateTime, contactName, details, totalBid, status,
      } = req.body;
      const { buyerId } = req.params;
      // TODO: How are we ensuring/restricting that the bid is only created by the currently logged-in user who is a buyer or an admin?
      return bids
        .create({
          buyerId,
          sellerId,
          contactName,
          pDateTime,
          details,
          totalBid,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(bids => res.status(201).send({
          message: 'Your bids details are created ',
          bids,
        }))
        .catch((e) => {
          res.status(500).send({ error: e.message });
        });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static list(req, res) {
    try {
      return bids.findAll().then(bids => res.status(200).send(bids));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static getItemByBuyerId(req, res) {
    try {
      // TODO: Once logged in, a buyer can see a different buyers data by guessing the id
      return bids.findAll({ where: { buyerId: req.params.buyerId } }).then(bids => res.status(200).send(bids));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static getBidById(req, res) {
    try {
      // TODO: Once logged in, a buyer can see a different buyers data by guessing the id
      return bids.findByPk(req.params.bidId).then(bids => res.status(200).send(bids));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static modify(req, res) {
    try {
      const {
        buyerId, sellerId, pDateTime, contactName, details, totalBid, status,
      } = req.body;
      // TODO: How are we ensuring/restricting that the bid is only modified by the buyer who bidded or an admin?
      return bids
        .findByPk(req.params.bidId)
        .then((item) => {
          item
            .update({
              sellerId: sellerId || bids.sellerId,
              details: details || bids.details,
              contactName: contactName || bids.contactName,
              buyerId: buyerId || bids.buyerId,
              pDateTime: pDateTime || bids.pDateTime,
              totalBid: totalBid || bids.totalBid,
              status: status || bids.status,
              updatedAt: new Date(),
            })
            .then((updatedbids) => {
              if (status && status.toLowerCase() === 'approved') {
                items.findOne({ where: { sellerId: updatedbids.sellerId } }).then((item) => {
                  const itemDetails = item.details;
                  for (const key of Object.keys(details)) {
                    itemDetails[key].quantity = itemDetails[key].quantity - details[key].bidQuantity;
                  }
                  item.update({
                    details: itemDetails,
                    updatedAt: new Date(),
                  });
                });
              }
              res.status(200).send({
                message: 'bids updated successfully',
                data: {
                  sellerId: updatedbids.sellerId,
                  details: updatedbids.details,
                },
              });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static delete(req, res) {
    try {
      // TODO: How are we ensuring/restricting that the bid is only deleted by the buyer who bidded or an admin?
      return bids
        .findByPk(req.params.bidId)
        .then((bid) => {
          if (!bid) {
            return res.status(404).send({
              message: 'bids Not Found',
            });
          }
          return bid
            .destroy()
            .then(() => res.status(200).send({
              message: 'bids successfully deleted',
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}

module.exports = Bids;

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /bids:
 *     get:
 *       description: get all bids
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *       responses:
 *         200:
 *           description: bids details.
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /bids/{bidId}:
 *     get:
 *       description: get all items belonging to an bidId
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: bidId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: bid details.
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /buyer/{buyerId}/bids:
 *     get:
 *       description: get all bids
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: buyerId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: bid details.
 */

/**
 * @swagger
 *
 * definitions:
 *   Bids:
 *     type: object
 *     required:
 *       - sellerId
 *       - pDateTime
 *       - contactName
 *       - details
 *       - totalBid
 *       - status
 *     properties:
 *       details:
 *         type: json
 *       sellerId:
 *         type: integer
 *       totalBid:
 *         type: integer
 *       pDateTime:
 *         type: date
 *       contactName:
 *         type: string
 *       status:
 *         type: string
 *
 *   modifyBids:
 *     type: object
 *     required:
 *       - sellerId
 *       - buyerId
 *       - pDateTime
 *       - contactName
 *       - details
 *       - totalBid
 *       - status
 *     properties:
 *       details:
 *         type: json
 *       sellerId:
 *         type: integer
 *       buyerId:
 *         type: integer
 *       totalBid:
 *         type: integer
 *       contactName:
 *         type: string
 *       pDateTime:
 *         type: date
 *       status:
 *         type: string
 */

//
/**
 * @swagger
 * path:
 *   /buyer/{buyerId}/bids:
 *     post:
 *       description: create bids
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: buyerId
 *           required: true
 *           schema:
 *              type: integer
 *         - name: bids
 *           description: bids object
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *            $ref: '#/definitions/Bids'
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: bids created successfully
 */

//
/**
 * @swagger
 * path:
 *   /bids/{bidId}:
 *     put:
 *       description: modify bids
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: bidId
 *           required: true
 *           schema:
 *              type: integer
 *         - name: bids
 *           description: bids object
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *            $ref: '#/definitions/modifyBids'
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: bid updated successfully
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /bids/{bidId}:
 *     delete:
 *       description: get all bids belonging to an bidId
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: bidId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: items successfully deleted.
 */
