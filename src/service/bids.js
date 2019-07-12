const  models = require('../models');

const { bids } = models;

class Bids {
  
  static create(req, res) {
    try {
    const { 
        sellerId,
        pDate,
        pTime,
        details,
        totalBid,
        status,
         } = req.body
    const { buyerId } = req.params
    return bids
      .create({
        buyerId,
        sellerId,
        pDate:  Date.parse(pDate, "dd/mm/yyyy"),
        pTime,
        details,
        totalBid,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(bids => res.status(201).send({
        message: `Your bids details are created `,
        bids
      })).catch(e => {
        res.status(500).send({error: e.message})
      });
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
    }
  static list(req, res) {
    try{
    return bids
      .findAll()
      .then(bids => res.status(200).send(bids));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }

  static getItemByBuyerId(req, res) {
    try {
    return bids
      .findAll({ where: {buyerId: req.params.buyerId }})
      .then(bids => res.status(200).send(bids));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }

  static getbidById(req, res) {
    try {
    return bids
      .findByPk(req.params.bidId)
      .then(bids => res.status(200).send(bids));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }


  static modify(req, res) {
    try {
    const {     
        buyerId,
        sellerId,
        pDate,
        pTime,
        details,
        totalBid,
        status, } = req.body
    return bids
      .findByPk(req.params.bidId)
      .then((item) => {
        item.update({
            sellerId: sellerId || bids.sellerId,
            details: details || bids.details,
            buyerId: buyerId || bids.buyerId,
            pDate: Date.parse(pDate, "dd/mm/yyyy") || bids.pDate,
            pTime: pTime || bids.pTime,
            totalBid: totalBid || bids.totalBid,
            status: status || bids.status,
            updatedAt: new Date()
        })
        .then((updatedbids) => {
          res.status(200).send({
            message: 'bids updated successfully',
            data: {
                sellerId:  updatedbids.sellerId,
                details: updatedbids.details,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }
  static delete(req, res) {
    try {
    return bids
      .findByPk(req.params.bidId)
      .then(bid => {
        if(!bid) {
          return res.status(400).send({
          message: 'bids Not Found',
          });
        }
        return bid
          .destroy()
          .then(() => res.status(200).send({
            message: 'bids successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
    }
    catch(e) {
      res.status(500).send({error: e.message})
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
 *       - pDate
 *       - pTime
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
 *       pDate:
 *         type: date
 *       pTime:
 *         type: time
 *       status:
 *         type: string
 *         
 *   modifyBids:
 *     type: object
 *     required:
 *       - sellerId
 *       - buyerId
 *       - pDate
 *       - pTime
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
 *       pDate:
 *         type: date
 *       pTime:
 *         type: time
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
*         - in: path
*           name: bidId
*           required: true
*           schema:
*              type: integer
*       responses:
*         200:
*           description: items successfully deleted.
*/