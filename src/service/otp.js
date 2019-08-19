const models = require('../models');
const config = require('../config');

const { userOtp } = models;

const api = require('../lib/api');

class Otp {
  /**
   * @swagger
   * path:
   *   /users/sendOtp:
   *     post:
   *       description: send otp
   *       parameters:
   *         - in: header
   *           name: x-access-token
   *           required: true
   *         - name: users
   *           description: users object
   *           in:  body
   *           required: true
   *           type: string
   *           schema:
   *            $ref: '#/definitions/users'
   *       produces:
   *        - application/json
   *       responses:
   *         200:
   *           description: otp created  successfully
   *       tags: ['Users']
   */
  static async create(req, res) {
    try {
      const { emailId, mobileNo } = req.body;
      const mobileNumber = `91${mobileNo}`;
      let generatedOtp;
      if (process.env.NODE_ENV === 'production') {
        generatedOtp = Math.floor(Math.random() * 899999 + 100000);
        await api.post(
          `https://control.msg91.com/api/sendotp.php?otp=${generatedOtp}&sender=CTIFLG&mobile=${mobileNumber}&authkey=${config.authKey}`,
        );
        await api.post(`https://control.msg91.com/api/sendmailotp.php?otp=${generatedOtp}&email=${emailId}&authkey=${config.authKey}`);
      } else {
        generatedOtp = mobileNo;
      }
      return userOtp
        .create({
          emailId,
          mobileNo,
          otp: generatedOtp,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(userOtp => res.status(201).send({
          message: 'Your otp details are created and sent',
        }))
        .catch((e) => {
          res.status(500).send({ error: e.message });
        });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}

module.exports = Otp;

/**
 * @swagger
 *
 * definitions:
 *   users:
 *     properties:
 *       emailId:
 *          type: string
 *       mobileNo:
 *          type: string

 */
