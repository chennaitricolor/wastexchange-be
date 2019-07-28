const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../config');

const db = {};

// connect to db Database
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pwd, {
  dialect: 'postgres',
  host: config.db.host,
  port: config.db.port
});
// sequelize.sync();
const basename = path.basename(module.filename);
const modelsDir = path.normalize(`${__dirname}/../models`);

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  // import model files and save model names
  .forEach(file => {
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
  {
    sequelize,
    Sequelize
  },
  db
);
