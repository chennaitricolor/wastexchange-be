const Joi = require('joi');

require('dotenv').config();
// Define validation for all the env vars
const envVarsSchema = Joi.object({
  AUTH_KEY: Joi.string(),
  // TODO: What is the need for NODE_CONFIG_ENV separate from NODE_ENV?
  NODE_ENV: Joi.string()
    .allow(['development', 'staging', 'production'])
    .default('development'),
  NODE_CONFIG_ENV: Joi.string()
    // TODO: Why the differentiation/short-form of the values?
    .allow(['dev', 'qa', 'uat', 'prod'])
    .default('dev'),
  // AIRBRAKE_PROJECT_ID: Joi.string()
  //   .required()
  //   .description('AirBrake Project Id'),
  // AIRBRAKE_PROJECT_KEY: Joi.string()
  //   .required()
  //   .description('AirBrake Project Key'),
  PORT: Joi.number().default(7600),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PWD: Joi.string(),
  DB_USER: Joi.string(),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const {
  // eslint-disable-next-line
  AUTH_KEY,
  NODE_ENV,
  NODE_CONFIG_ENV,
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_PWD,
  DB_USER,
} = envVars;

const config = {
  env: NODE_CONFIG_ENV.trim(),
  authKey: AUTH_KEY.trim(),
  db: {
    host: DB_HOST.trim(),
    name: DB_NAME.trim(),
    port: DB_PORT.trim(),
    pwd: DB_PWD.trim(),
    user: DB_USER.trim(),
  },
  port: PORT,
  logPrefix: 'CHENNAI :: waste-management-service  :: ',
};

module.exports = config;
