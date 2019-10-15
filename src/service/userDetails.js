const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pick = require('object.pick');
const sequelize = require('sequelize');
const models = require('../models');
const notifier = require('../lib/notifier');
const templates = require('../constants').notificationTemplates;
const _ = require('lodash');
const moment = require('moment');

const {
  items, userDetails, userOtp, userTokens,
} = models;

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
              // TODO: [STYLE] Move the salt to a common location so that it can be reused
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
   *        - name: x-wstexchng-platform
   *          description: platform value based on which auth and refresh token expiry will be set
   *          in: x-wstexchng-platform
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
      let platform = req.headers['x-wstexchng-platform']
      userDetails
        .findOne({ where: { loginId: req.body.loginId } })
        .then((user) => {
          // TODO: [AUTH] Is it a security loophole that we expose whether such a userId exists or not?
          if (!user) return res.status(404).send('No user found.');

          // check if the password is valid
          const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (!passwordIsValid) return res.status(401).send('Invalid login credentials');

          // check if the user has been approved
          if (user.approved === false && (user.persona === 'buyer' || user.persona === 'seller')) return res.status(401).send('The user has not yet been approved by an admin');

          return UserDetails._createTokenPair(user.id, user.persona, platform).then(userToken => res.status(200).send({
            auth: true,
            token: userToken.authToken,
            approved: user.approved,
            refreshToken: userToken.refreshToken,
            authTokenExpiry: userToken.authTokenExpiry,
            refreshTokenExpiry: userToken.refreshTokenExpiry,
          }));
        })
        .catch((e) => {
          res.status(500).send({ error: e.message });
        });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  /**
   * @swagger
   * path:
   *   /users/refresh-token:
   *     post:
   *       description: refresh token
   *       produces:
   *        - application/json
   *       parameters:
   *        - name: x-wstexchng-platform
   *          description: platform value based on which auth and refresh token expiry will be set
   *          in: x-wstexchng-platform
   *        - name: token pair
   *          description: auth token and refresh token
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *           $ref: '#/definitions/refreshTokenSchema'
   *       responses:
   *         200:
   *           description: refresh token generated successfully
   *       tags: ['Users']
   */
  static refreshToken(req, res) {
    // TODO: [STYLE] Move the salt to a common location so that it can be reused
    jwt.verify(req.body.refreshToken, 'secret cant tell', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          auth: false,
          message: 'Invalid refresh token.',
        });
      }

      const userId = decoded.id;
      const persona = decoded.persona;
      const platform = req.headers['x-wstexchng-platform']
      let oldToken;
      let newToken;
      let transaction;

      userTokens
        .findOne({
          where: {
            authToken: req.body.authToken,
            refreshToken: req.body.refreshToken,
          },
        })
        .then((refreshToken) => {
          if (!refreshToken) {
            return Promise.reject({
              error: new Error('Refresh token not found'),
              status: 404,
            });
          }

          if (refreshToken.isUsed) {
            return Promise.reject({
              error: new Error('Refresh token is not valid'),
              status: 400,
            });
          }
          oldToken = refreshToken;
          return models.sequelize.transaction();
        })
        .then((t) => {
          transaction = t;
          return UserDetails._createTokenPair(userId, persona, platform);
        })
        .then((userToken) => {
          newToken = userToken;
          oldToken.isUsed = true;
          return oldToken.save({ transaction });
        })
        .then(() => {
          transaction.commit();
          return res.status(200).send({
            auth: true,
            token: newToken.authToken,
            refreshToken: newToken.refreshToken,
            authTokenExpiry: newToken.authTokenExpiry,
            refreshTokenExpiry: newToken.refreshTokenExpiry,
          });
        })
        .catch((e) => {
          const message = e.error ? e.error.message : e.message;
          res.status(e.status || 500).send({ error: message });
        });
    });
  }

  static _createTokenPair(userId, persona, platform) {
    let isMobilePlatform = platform && (_.includes(platform.toLowerCase(), 'ios') || _.includes(platform.toLowerCase(), 'android'))

    const userInfo = {
      id: userId,
      persona,
    };
    // TODO: [STYLE] Move the salt to a common location so that it can be reused
    // expiresIn format: seconds (days * hours * minutes * seconds)
    const token = jwt.sign(userInfo, 'secret cant tell', {
      expiresIn: isMobilePlatform ? (180 * 24 * 60 * 60) : (1 * 24 * 60 * 60),
    });

    // TODO: [STYLE] Move the salt to a common location so that it can be reused
    // expiresIn format: seconds (days * hours * minutes * seconds)
    const refreshToken = jwt.sign(userInfo, 'secret cant tell', {
      expiresIn: isMobilePlatform ? ((180 + 30) * 24 * 60 * 60) : (30 * 24 * 60 * 60),
    });

    const now = new Date();

    return userTokens.create({
      userId,
      authToken: token,
      refreshToken,
      authTokenExpiry: moment().add(isMobilePlatform? 180 : 30, 'days'), // now.setDate(now.getDate() + 1),
      refreshTokenExpiry: moment().add(isMobilePlatform? (180 + 30) : 30, 'days'),
    });
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
 *
 *   refreshTokenSchema:
 *     type: object
 *     properties:
 *       authToken:
 *         type: string
 *       refreshToken:
 *         type: string
 */
