module.exports = {
  development: {
    username: process.env.DB_USER || "dev",
    password: process.env.DB_PWD || "dev",
    database: process.env.DB_NAME || "wastexchange_development",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: process.env.DB_USER || "dev",
    password: process.env.DB_PWD || "dev",
    database: process.env.DB_NAME || "wastexchange_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    operatorsAliases: false
  },
  stagin: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME || "wastexchange_staging",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME || "wastexchange_production",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
};
