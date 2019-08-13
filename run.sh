#!/usr/bin/env bash

set -e
set -o pipefail

dockerize -timeout 20s -wait tcp://${DB_HOST}:${DB_PORT} npx sequelize-cli db:migrate
npm start