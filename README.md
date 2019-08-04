# Waste Exchange Service

## Introduction

This repository is backend service for [indiawasteexchange.com](https://indiawasteexchange.com) and it is built in **Node.js** and uses **PostgreSQL** as database.

Swagger file is also available for the endpoints.

## Getting Started

### 1. Software Dependencies

* GIT version ^2.15 - [Download and Install from git-scm.com](https://git-scm.com/downloads)
* Node version 10.16.0 LTS - [ Download and Install from nodejs.org](https://nodejs.org/en/#download)

### 2. Installation Process

* Clone the repository
* run the command `npm install`

### 3. Build and Run

* Windows : run `local-startup.bat`
* Linux and Mac : run `local-startup.sh`

### 4. Creating migrations and seeds for the database

* `npx sequelize migration:generate Create-Bids`
* `npx sequelize-cli db:migrate`
* `npx sequelize-cli db:migrate:undo:all`
* `npx sequelize-cli seed:generate --name seed-bids`
* `npx sequelize-cli db:seed:all`
* `npx sequelize-cli db:seed:undo:all`

For more commands/options, refer to the [full documentation](https://sequelize.org/master/manual/migrations.html#creating-first-model--and-migration-)

### 5. Latest Releases

* Version 0.1.0

### 6. API References

* Swagger endpoint: [http://localhost:7000/api-docs/](http://localhost:7000/api-docs/)

### 7. Folder Structure

    |_src
        |_config    `Environment config`
        |_constants `Constants files`
        |_models    `Business models`
        |_routes    `Express routes`
        |_service   `Business logic`

## Watch Mode ( Nodemon )

To run in watch mode: `npm run watch`
