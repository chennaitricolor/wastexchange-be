const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { items, userDetails, userOtp } = models;

class UserDetails {
  static create(req, res) {
    try {
      // TODO: Does this mean that the password is sent unencrypted from the frontend?
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const {
        city,
        pinCode,
        address,
        mobNo,
        altMobNo,
        lat,
        persona,
        emailId,
        name,
        otp,
        long
      } = req.body
      userOtp.findOne({ where: { emailId: emailId }, order: [['updatedAt', 'DESC']] }).then((user) => {
        if (otp == user.otp) {
          return userDetails
            .create({
              city,
              emailId,
              loginId: emailId,
              password: hashedPassword,
              name,
              pinCode,
              address,
              mobNo,
              altMobNo,
              persona,
              lat,
              long,
              createdAt: new Date(),
              updatedAt: new Date()
            })
            .then(userData =>
              {
                // TODO: This seems like a hack?
                // an empty insert to items table to handle maps rendering
                items.create({
                  sellerId: userData.id,
                  details: {},
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
                var token = jwt.sign({ id: userData.id }, 'secret cant tell', {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(201).send({
                success: true,
                message: 'User successfully created',
                auth: true, token: token
              })}).catch(e => {
              res.status(500).send({ error: e.message })
            });
        }
        else {
          return res.status(401).send("invalid otp");
        }
      });
    }
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }
  static list(req, res) {
    return userDetails
      .findAll()
      .then(users => res.status(200).send(users));
  }

  static getUserDetailById(req, res) {
    try {
      // TODO: How are we handling 'not found' record?
      return userDetails
        .findByPk(req.params.id)
        .then(users => res.status(200).send(users));
    }
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }

  static modify(req, res) {
    try {
      // TODO: Does this mean that the password is sent unencrypted from the frontend?
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const {
        city,
        pinCode,
        address,
        emailId,
        name,
        mobNo,
        altMobNo,
        lat,
        long } = req.body
      return userDetails
        .findByPk(req.params.id)
        .then((details) => {
          details.update({
            city: city || details.city,
            pinCode: pinCode || details.pinCode,
            address: address || details.address,
            emailId: emailId || details.emailId,
            loginId: emailId || details.loginId,
            password: hashedPassword || details.password,
            name: name || details.name,
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
                  // TODO: Since the 'updateduserDetails' object has all the updated fields, can't we not do the '||' style here?
                  city: city || updateduserDetails.city,
                  pinCode: pinCode || updateduserDetails.pinCode,
                  address: address || updateduserDetails.address,
                  mobNo: mobNo || updateduserDetails.mobNo,
                  altMobNo: altMobNo || updateduserDetails.altMobNo,
                  emailId: emailId || details.emailId,
                  loginId: emailId || details.loginId,
                  name: name || details.name,
                  lat: lat || updateduserDetails.lat,
                  long: long || updateduserDetails.long,
                }
              })
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }
  static delete(req, res) {
    try {
      return userDetails
        .findByPk(req.params.id)
        .then(details => {
          if (!details) {
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
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }

  static login(req, res) {
    try {
      userDetails.findOne({ where: { loginId: req.body.loginId } }).then((user) => {
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
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }
  static getUserIdByToken(req, res) {
    try {
      userDetails.findByPk(req.userId, { attributes: { exclude: ['password'] } }).then((user) => {
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
      });
    }
    catch (e) {
      res.status(500).send({ error: e.message })
    }
  }

}

module.exports = UserDetails;


 // Swagger Definitions
/**
* @swagger
* path:
*   /users:
*     get:
*       description: get all userdetails
*       responses:
*         200:
*           description: user details.
*/

 // Swagger Definitions
/**
* @swagger
* path:
*   /users/{id}:
*     get:
*       description: get user details belonging to an id
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*              type: integer
*       responses:
*         200:
*           description: user details.
*/

/**
 * @swagger
 *
 * definitions:
 *   UserDetails:
 *     type: object
 *     required:
 *       - city
 *       - pinCode
 *       - address
 *       - mobNo
 *       - name
 *       - password
 *       - emailId
 *       - otp
 *       - altMobNo
 *       - lat
 *       - persona
 *       - long
 *     properties:
 *       city:
 *         type: string
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       pinCode:
 *         type: integer
 *       mobNo:
 *         type: integer
 *       altMobNo:
 *         type: integer
 *       lat:
 *         type: number
 *       long:
 *         type: number
 *       persona:
 *         type: string
 *       address:
 *         type: string
 *       otp:
 *         type: number
 *
 *   modifyUserDetails:
 *     type: object
 *     required:
 *       - city
 *       - pinCode
 *       - address
 *       - mobNo
 *       - altMobNo
 *       - name
 *       - password
 *       - emailId
 *       - lat
 *       - long
 *     properties:
 *       city:
 *         type: string
 *       pinCode:
 *         type: integer
 *       mobNo:
 *         type: integer
 *       altMobNo:
 *         type: integer
 *       lat:
 *         type: string
 *       long:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       address:
 *         type: string
 *   loginSchema:
 *     type: object
 *     properties:
 *       loginId:
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
*           $ref: '#/definitions/UserDetails'
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


/**
* @swagger
* path:
*   /users/{id}:
*     put:
*       description: modify userdetails
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*              type: integer
*         - name: userdetails
*           description: userdetails object
*           in:  body
*           required: true
*           type: string
*           schema:
*            $ref: '#/definitions/modifyUserDetails'
*       produces:
*        - application/json
*       responses:
*         200:
*           description: userdetails updated successfully
 */


  // Swagger Definitions
/**
* @swagger
* path:
*   /users/{id}:
*     delete:
*       description: delete all userdetails belonging to an id
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*              type: integer
*       responses:
*         200:
*           description: userdetails successfully deleted.
*/