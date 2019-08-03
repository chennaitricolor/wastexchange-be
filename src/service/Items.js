const models = require('../models');

const { items } = models;

class Items {
  static create(req, res) {
    try {
      const { details } = req.body;
      const { sellerId } = req.params;
      // TODO: How are we ensuring/restricting that the item is only created by the currently logged-in user who is a seller or an admin?
      return items
        .create({
          sellerId,
          details,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(items => res.status(201).send({
          message: 'Your items details are created ',
          items,
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
      return items.findAll().then(items => res.status(200).send(items));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static getItemBySellerId(req, res) {
    try {
      // TODO: Is the 'findOne' the correct call to make?
      return items.findOne({ where: { sellerId: req.params.sellerId } }).then(items => res.status(200).send(items));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static getItemById(req, res) {
    try {
      return items.findByPk(req.params.itemId).then(items => res.status(200).send(items));
      // TODO: How are we handling 'not found' record?
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static modify(req, res) {
    try {
      const { sellerId, details } = req.body;
      // TODO: How are we ensuring/restricting that the item is only modified by the seller or an admin?
      return items
        .findByPk(req.params.itemId)
        .then((item) => {
          item
            .update({
              sellerId: sellerId || items.sellerId,
              details: details || items.details,
              updatedAt: new Date(),
            })
            .then((updateditems) => {
              res
                .status(200)
                .send({
                  message: 'items updated successfully',
                  data: {
                    sellerId: updateditems.sellerId,
                    details: updateditems.details,
                  },
                })
                .catch((e) => {
                  res.status(500).send({ error: e.message });
                });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(404).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static delete(req, res) {
    try {
      // TODO: How are we ensuring/restricting that the item is only deleted by the seller or an admin?
      return items
        .findByPk(req.params.itemId)
        .then((item) => {
          if (!item) {
            return res.status(400).send({
              message: 'items Not Found',
            });
          }
          return item
            .destroy()
            .then(() => res.status(200).send({
              message: 'items successfully deleted',
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(404).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}

module.exports = Items;

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /items:
 *     get:
 *       description: get all items
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *       responses:
 *         200:
 *           description: item details.
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /items/{itemId}:
 *     get:
 *       description: get all items belonging to an itemid
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: itemId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: item details.
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /seller/{sellerId}/items:
 *     get:
 *       description: get all seller  items
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: sellerId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: item details.
 */

/**
 * @swagger
 *
 * definitions:
 *   Items:
 *     type: object
 *     required:
 *       - details
 *     properties:
 *       details:
 *         type: json
 *   modifyItems:
 *     properties:
 *       sellerId:
 *          type: integer
 *       details:
 *          type: json

 */

//
/**
 * @swagger
 * path:
 *   /seller/{sellerId}/items:
 *     post:
 *       description: create items seller has put up for sale
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: sellerId
 *           required: true
 *           schema:
 *              type: integer
 *         - name: items
 *           description: items object
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *            $ref: '#/definitions/Items'
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: item created  successfully
 */

//
/**
 * @swagger
 * path:
 *   /items/{itemId}:
 *     put:
 *       description: modify items seller has put up for sale
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: itemId
 *           required: true
 *           schema:
 *              type: integer
 *         - name: items
 *           description: items object
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *            $ref: '#/definitions/modifyItems'
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: item updated  successfully
 */

// Swagger Definitions
/**
 * @swagger
 * path:
 *   /items/{itemId}:
 *     delete:
 *       description: delete all items belonging to an itemid
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           required: true
 *         - in: path
 *           name: itemId
 *           required: true
 *           schema:
 *              type: integer
 *       responses:
 *         200:
 *           description: items successfully deleted.
 */
