const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pick = require('object.pick');
const models = require('../models');
const notifier = require('../lib/notifier');
const templates = require('../constants').notificationTemplates;

const { items, userDetails, userOtp } = models;

class UserDetails {
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
   *       tags: ['Users']
   */
  static create(req, res) {
    const self = this;
    try {
      // TODO: [AUTH] Does this mean that the password is sent unencrypted from the frontend?
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const {
        city, pinCode, address, mobNo, altMobNo, lat, persona, emailId, name, otp, long,
      } = req.body;
      // TODO: [PERF] Rather than retrieving from the db and then checking the otp, can we include that in the where clause?
      userOtp.findOne({ where: { emailId }, order: [['updatedAt', 'DESC']] }).then((user) => {
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
              approved: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((userData) => {
              // TODO: [HACK] This seems like a hack?
              // an empty insert to items table to handle maps rendering
              items.create({
                sellerId: userData.id,
                details: {},
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              const token = jwt.sign({ id: userData.id }, 'secret cant tell', {
                // TODO: Token expiry constant time be declared a constant as it's used in 2 places - create and login.
                expiresIn: 86400, // expires in 24 hours
              });

              notifyUser('buyer/seller-signup', userData);

              res.status(201).send({
                success: true,
                message: 'User successfully created',
                auth: true,
                token,
              });
            })
            .catch((e) => {
              res.status(500).send({ error: e.message });
            });
        }

        return res.status(401).send('invalid otp');
      });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  /**
   * @swagger
   * path:
   *   /users:
   *     get:
   *       description: get all userdetails
   *       responses:
   *         200:
   *           description: user details.
   *       tags: ['Users']
   */
  static list(req, res) {
    // TODO: Do we need pagination?
    const whereClause = pick(req.query, ['persona', 'name', 'login', 'emailId', 'approved', 'city']);
    return userDetails
      .findAll({
        where: whereClause,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'loginId'],
        },
      })
      .then(users => res.status(200).send(users));
  }

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
   *         - in: header
   *           name: x-access-token
   *           required: true
   *       responses:
   *         200:
   *           description: user details.
   *       tags: ['Users']
   */
  static getUserDetailById(req, res) {
    try {
      // TODO: [AUTH] Are we exposing details of other users without checking current logged-in user's privilege?
      // TODO: [BUG] How are we handling 'not found' record?
      return userDetails.findByPk(req.params.id).then(users => res.status(200).send(users));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

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
   *         - in: header
   *           name: x-access-token
   *           required: true
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
   *       tags: ['Users']
   */
  static modify(req, res) {
    try {
      // TODO: [AUTH] Does this mean that the password is sent unencrypted from the frontend?
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const {
        city, pinCode, address, emailId, name, mobNo, altMobNo, lat, long,
      } = req.body;
      return userDetails
        .findByPk(req.params.id)
        .then((details) => {
          details
            .update({
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
              updatedAt: new Date(),
            })
            .then((updateduserDetails) => {
              res.status(200).send({
                message: 'userDetails updated successfully',
                data: {
                  // TODO: [STYLE] Since the 'updateduserDetails' object has all the updated fields, can't we not do the '||' style here?
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
                },
              });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

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
   *         - in: header
   *           name: x-access-token
   *           required: true
   *       responses:
   *         200:
   *           description: userdetails successfully deleted.
   *       tags: ['Users']
   */
  static delete(req, res) {
    try {
      // TODO: How are we ensuring that the currently logged-in user is privileged to perform this action?
      return userDetails
        .findByPk(req.params.id)
        .then((details) => {
          if (!details) {
            return res.status(404).send({
              message: 'userDetails Not Found',
            });
          }
          return details
            .destroy()
            .then(() => res.status(200).send({
              message: 'userDetails successfully deleted',
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  /**
   * @swagger
   * path:
   *   /users/{id}/approve:
   *     put:
   *       description: approve userdetail belonging to an id
   *       parameters:
   *         - in: path
   *           name: id
   *           required: true
   *           schema:
   *              type: integer
   *         - in: header
   *           name: x-access-token
   *           required: true
   *       responses:
   *         200:
   *           description: userdetails successfully approved.
   *       tags: ['Users']
   */
  static approve(req, res) {
    try {
      // TODO: How are we ensuring that the currently logged-in user is privileged to perform this action?
      return userDetails
        .findByPk(req.params.id)
        .then((details) => {
          details
            .update({
              approved: true,
              updatedAt: new Date(),
            })
            .then((_updateduserDetails) => {
              notifyUser('buyer/seller-approved', _updateduserDetails);
              res.status(200).send({
                message: 'user approved successfully',
              });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

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
   *       tags: ['Users']
   */
  static login(req, res) {
    try {
      userDetails.findOne({ where: { loginId: req.body.loginId } }).then((user) => {
        // TODO: [AUTH] Is it a security loophole that we expose whether such a userId exists or not?
        if (!user) return res.status(404).send('No user found.');

        // check if the user has been approved
        if (user.approved === false && (user.persona === 'buyer' || user.persona === 'seller')) return res.status(401).send('The user has not yet been approved by an admin');

        // check if the password is valid
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // TODO: [STYLE] Move the salt to a common location so that it can be reused
        // if user is found and password is valid
        // create a token
        const token = jwt.sign(
          {
            id: user.id,
            persona: user.persona,
          },
          'secret cant tell',
          {
            expiresIn: 86400, // expires in 24 hours
          },
        );

        // return the information including token as JSON
        res.status(200).send({ auth: true, token, approved: user.approved });
      });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

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
   *       tags: ['Users']
   */
  // TODO: Should this method be called getUserByToken since we are returning a user
  static getUserIdByToken(req, res) {
    try {
      userDetails.findByPk(req.userId, { attributes: { exclude: ['password'] } }).then((user) => {
        // TODO: [AUTH] Is it a security loophole that we expose whether such a userId exists or not?
        if (!user) return res.status(404).send('No user found.');
        res.status(200).send(user);
      });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}

function notifyUser(templateId, user) {
  // const emailMessage = templates[templateId].email.message.replace('{name}', user.name);
  // const subject = templates[templateId].email.subject;
  // notifier.sendEmail(emailMessage, subject, undefined, user.emailId);

  const smsMessage = templates[templateId].sms.message.replace('{name}', user.name);
  notifier.sendSMS(smsMessage, undefined, [user.mobNo, user.altMobNo], 91);
}

module.exports = UserDetails;

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
