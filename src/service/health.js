const router = require('express').Router();

/**
 * @swagger
 * path:
 *   /health:
 *     get:
 *       description: get health update
 *       responses:
 *         200:
 *           description: service up and running.
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: boolean
 *                 description: Working state
 *               message:
 *                 type: string
 *                 description: Message to indicate status
 *               date:
 *                 type: string
 *                 description: The present date time in ISO format
 *       tags: ['Health']
 */
const healthCheck = async (req, res) => {
  res.json({ state: true, message: 'Service is Alive!', date: new Date().toISOString() });
};

router.route('/').get(healthCheck);

module.exports = router;
