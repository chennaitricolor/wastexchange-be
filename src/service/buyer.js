const  models = require('../models');
const { buyerMeta } = models;

class Buyer {
  static signUp(req, res) {
    const { name, mobile_no, email_id, password } = req.body
      return buyerMeta
        .create({
          name,
          mobileNo:mobile_no,
          emailId:email_id,
          password,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .then(userData => res.status(201).send({
          success: true,
          message: 'User successfully created',
          userData
        }))
    }
}

module.exports = Buyer;