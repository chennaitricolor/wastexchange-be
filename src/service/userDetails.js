const  models = require('../models');

const { userDetails } = models;

class UserDetails {
  static create(req, res) {
    const { 
        city,
        pinCode,
        address,
        mobNo,
        altMobNo,
        lat,
        persona,
        long
         } = req.body
    const { userId } = req.params
    return userDetails
      .create({
        userId,
        city,
        pinCode,
        address,
        mobNo,
        altMobNo,
        persona,
        lat,
        long,
        cretedAt: new Date(),
        updatedAt: new Date()
      })
      .then(user => res.status(201).send({
        message: `Your user details are created `,
        user
      }))
    }
  static list(req, res) {
    return userDetails
      .findAll()
      .then(users => res.status(200).send(users));
  }
  static modify(req, res) {
    const {     
        city,
        pinCode,
        address,
        mobNo,
        altMobNo,
        lat,
        long } = req.body
    return userDetails
      .findByPk(req.params.detailsId)
      .then((details) => {
        details.update({
            city: city || details.city,
            pinCode: pinCode || details.pinCode,
            address: address || details.address,
            mobNo: mobNo || details.mobNo,
            altMobNo: altMobNo || details.altMobNo,
            lat: lat || details.lat,
            long: long || details.long,
            updatedAt: new Date()
        })
        .then((updateduserDetails) => {
          res.status(200).send({
            message: 'userDetails updated successfully',
            data: {
                city: city || updateduserDetails.city,
                pinCode: pinCode || updateduserDetails.pinCode,
                address: address || updateduserDetails.address,
                mobNo: mobNo || updateduserDetails.mobNo,
                altMobNo: altMobNo || updateduserDetails.altMobNo,
                lat: lat || updateduserDetails.lat,
                long: long || updateduserDetails.long,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static delete(req, res) {
    return userDetails
      .findByPk(req.params.detailsId)
      .then(details => {
        if(!details) {
          return res.status(400).send({
          message: 'userDetails Not Found',
          });
        }
        return details
          .destroy()
          .then(() => res.status(200).send({
            message: 'userDetails successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
}

module.exports = UserDetails;