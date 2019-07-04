const  models = require('../models');
const { sellerMeta } = models;

class Seller {
  static signUp(req, res) {
    const { name, mobile_no, email_id, password } = req.body
      return sellerMeta
        .create({
          name,
          mobileNo:mobile_no,
          emailId:email_id,
          password
        })
        .then(userData => res.status(201).send({
          success: true,
          message: 'User successfully created',
          userData
        }))
    }
}

module.exports = Seller;