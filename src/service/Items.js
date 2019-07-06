const  models = require('../models');

const { items } = models;

class Items {
  static create(req, res) {
    const { 
        details
         } = req.body
    const { sellerId } = req.params
    return items
      .create({
        sellerId,
        details,
        cretedAt: new Date(),
        updatedAt: new Date()
      })
      .then(items => res.status(201).send({
        message: `Your items details are created `,
        items
      }))
    }
  static list(req, res) {
    return items
      .findAll()
      .then(items => res.status(200).send(items));
  }

  static getItemBySellerId(req, res) {
    return items
      .findOne({ where: {sellerId: req.params.sellerId }})
      .then(items => res.status(200).send(items));
  }

  static getItemById(req, res) {
    return items
      .findByPk(req.params.itemId)
      .then(items => res.status(200).send(items));
  }


  static modify(req, res) {
    const {     
      sellerId,
       details } = req.body
    return items
      .findByPk(req.params.itemId)
      .then((item) => {
        item.update({
            sellerId: sellerId || items.sellerId,
            details: details || items.details,
            updatedAt: new Date()
        })
        .then((updateditems) => {
          res.status(200).send({
            message: 'items updated successfully',
            data: {
                sellerId:  updateditems.sellerId,
                details: updateditems.details,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static delete(req, res) {
    return items
      .findByPk(req.params.itemId)
      .then(item => {
        if(!item) {
          return res.status(400).send({
          message: 'items Not Found',
          });
        }
        return item
          .destroy()
          .then(() => res.status(200).send({
            message: 'items successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
}

module.exports = Items;