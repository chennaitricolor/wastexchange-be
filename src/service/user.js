const  models = require('../models');
const { userMeta , userOtp} = models;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserMeta {
  static signUp(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const { name, mobile_no, email_id, otp, persona } = req.body;
      userOtp.findOne({ where: {emailId: email_id }, order: [['updatedAt', 'DESC']]}).then( (user) => {
      if (otp == user.otp) {
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
      else {
        return res.status(401).send("invalid otp");
      }
    });
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

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - name
 *       - email_id
 *       - mobile_no
 *       - persona
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email_id:
 *          type: string
 *       mobile_no: 
 *          type: integer
 *       persona:
 *          type: string
 *       otp:
 *          type: integer
 *   loginSchema:
 *     properties:
 *       email: 
 *          type: string
 *       password:
 *          type: string

 */


// Swagger Definitions
/**
* @swagger
* path:
*   /users/register:
*     post:
*       description: signup (create new user meta)
*       produces:
*        - application/json
*       parameters:
*        - name: user
*          description: User object
*          in:  body
*          required: true
*          type: string
*          schema:
*           $ref: '#/definitions/NewUser'
*       responses:
*         201:
*           description: user created successfully

*/
//
/**
* @swagger
* path:
*   /users/login:
*     post:
*       description: login
*       produces:
*        - application/json
*       parameters:
*        - name: user
*          description: User object
*          in:  body
*          required: true
*          type: string
*          schema:
*           $ref: '#/definitions/loginSchema'
*       responses:
*         200:
*           description: user logged in  successfully
 */


 // Swagger Definitions
/**
* @swagger
* path:
*   /users/me:
*     get:
*       description: get user meta with jwt
*       parameters:
*          - in: header
*            name: x-access-token
*            required: true
*       responses:
*         200:
*           description: user details.
*/
