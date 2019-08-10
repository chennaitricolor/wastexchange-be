#!/usr/bin/env bash

set -e
set -o pipefail

dockerize -timeout 20s -wait tcp://${DB_HOST}:${DB_PORT} npx sequelize-cli db:migrate
if [ "${SEED_DB}" = "true" ]; then
  dockerize -timeout 20s -wait tcp://${DB_HOST}:${DB_PORT} npx sequelize-cli db:seed:all
fi
npm start