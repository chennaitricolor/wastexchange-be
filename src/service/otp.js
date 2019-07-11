const  models = require('../models');
const  config = require('../config');

const { userOtp } = models;

const api = require('../lib/api');

class Otp {
    static async create(req, res) {
      try {
        const { 
            emailId,
            mobileNo
             } = req.body;
             const generatedOtp = Math.floor(Math.random() * 899999 + 100000);
             console.log("generatedOtp", generatedOtp);
             const mobileNumber = `91${mobileNo}`
       const response =  await api.post(`https://control.msg91.com/api/sendotp.php?otp=${generatedOtp}&sender=CTIFLG&mobile=${mobileNumber}&authkey=${config.authKey}`);
       await api.post(`https://control.msg91.com/api/sendmailotp.php?otp=${generatedOtp}&email=${emailId}&authkey=${config.authKey}`)
       return userOtp
          .create({
            emailId,
            mobileNo,
            otp: generatedOtp,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then(userOtp => res.status(201).send({
            message: `Your otp details are created and sent`
          })).catch(e => {
            res.status(500).send({error: e.message})
          });
        }
        catch(e) {
          res.status(500).send({error: e.message})
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

//
/**
* @swagger
* path:
*   /users/sendOtp:
*     post:
*       description: send otp
*       parameters:
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
 */