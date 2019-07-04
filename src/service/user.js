const  models = require('../models');
const { userMeta } = models;

class UserMeta {
  static signUp(req, res) {
    const { name, mobile_no, email_id, persona, password } = req.body
      return userMeta
        .create({
          name,
          mobileNo:mobile_no,
          emailId:email_id,
          password,
          persona,
          createdAt: new Date(),
          updatedAt: new Date
        })
        .then(userData => res.status(201).send({
          success: true,
          message: 'User successfully created',
          userData
        }))
    }
}

module.exports = UserMeta;