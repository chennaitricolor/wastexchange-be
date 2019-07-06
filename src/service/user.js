const  models = require('../models');
const { userMeta } = models;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserMeta {
  static signUp(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const { name, mobile_no, email_id, persona } = req.body
      return userMeta
        .create({
          name,
          mobileNo:mobile_no,
          emailId:email_id,
          password: hashedPassword,
          persona,
          createdAt: new Date(),
          updatedAt: new Date
        })
        .then(userData => {   
          var token = jwt.sign({ id: userData.id }, 'secret cant tell', {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(201).send({
          success: true,
          message: 'User successfully created',
          auth: true, token: token
        })})
    }

    static login(req, res) {
      userMeta.findOne({ where: {emailId: req.body.email }}).then( (user) => {
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user.id }, 'secret cant tell', {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    
    });
  }
  static getUserIdByToken(req, res) {
    userMeta.findByPk(req.userId, {  attributes: {exclude: ['password']}}).then( (user) => {
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  }
}

module.exports = UserMeta;