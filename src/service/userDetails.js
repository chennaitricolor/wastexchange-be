const  models = require('../models');

const { userDetails } = models;

class UserDetails {
  static create(req, res) {
    try {
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
      })).catch(e => {
        res.status(500).send({error: e.message})
      });
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
    }
  static list(req, res) {
    return userDetails
      .findAll()
      .then(users => res.status(200).send(users));
  }

  static getUserDetailsByUserId(req, res) {
    try {
    return userDetails
      .findAll({ where: { userId: req.params.userId}})
      .then(users => res.status(200).send(users));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }


  static getUserDetailByDetailId(req, res) {
    try {
    return userDetails
      .findByPk(req.params.detailId)
      .then(users => res.status(200).send(users));
    }
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }

  static modify(req, res) {
    try {
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
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }
  static delete(req, res) {
    try {
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
    catch(e) {
      res.status(500).send({error: e.message})
    }
  }
}

module.exports = UserDetails;


 // Swagger Definitions
/**
* @swagger
* path:
*   /userdetails:
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
*   /userdetails/{detailsId}:
*     get:
*       description: get user details belonging to an detailsId
*       parameters:
*         - in: path
*           name: detailsId
*           required: true
*           schema:
*              type: integer
*       responses:
*         200:
*           description: user details.
*/

 // Swagger Definitions
/**
* @swagger
* path:
*   /users/{userId}/userdetails:
*     get:
*       description: get all user details
*       parameters:
*         - in: path
*           name: userId
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
 *       - altMobNo
 *       - lat
 *       - persona
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
 *         type: number
 *       long:
 *         type: number
 *       persona:
 *         type: string
 *       address:
 *         type: string
 *         
 *   modifyUserDetails:
 *     type: object
 *     required:
 *       - city
 *       - pinCode
 *       - address
 *       - mobNo
 *       - altMobNo
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
 *       address:
 *         type: string
 */

//
/**
* @swagger
* path:
*   /users/{userId}/userdetails:
*     post:
*       description: create userDetails
*       parameters:
*         - in: path
*           name: userId
*           required: true
*           schema:
*              type: integer
*         - name: details
*           description: details object
*           in:  body
*           required: true
*           type: string
*           schema:
*            $ref: '#/definitions/UserDetails'
*       produces:
*        - application/json
*       responses:
*         200:
*           description: details created successfully
 */

 //
/**
* @swagger
* path:
*   /userdetails/{detailsId}:
*     put:
*       description: modify userdetails
*       parameters:
*         - in: path
*           name: detailsId
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
*   /userdetails/{detailsId}:
*     delete:
*       description: delete all userdetails belonging to an detailsId
*       parameters:
*         - in: path
*           name: detailsId
*           required: true
*           schema:
*              type: integer
*       responses:
*         200:
*           description: userdetails successfully deleted.
*/