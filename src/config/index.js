const Joi = require('joi');

require('dotenv').config();
// Define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default('development'),
  NODE_CONFIG_ENV: Joi.string()
    .allow(['dev', 'qa', 'uat', 'prod'])
    .default('dev'),
  // AIRBRAKE_PROJECT_ID: Joi.string()
  //   .required()
  //   .description('AirBrake Project Id'),
  // AIRBRAKE_PROJECT_KEY: Joi.string()
  //   .required()
  //   .description('AirBrake Project Key'),
  PORT: Joi.number().default(7600),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const {
  // eslint-disable-next-line
  NODE_ENV,
  NODE_CONFIG_ENV,
  PORT,
} = envVars;

const config = {
  env: NODE_CONFIG_ENV.trim(),
  port: PORT,
  logPrefix: 'CHENNAI :: waste-management-service  :: ',
};

module.exports = config;
