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

### 4. Latest Releases

* Version 0.1.0

### 5. API References

* Swagger endpoint: [http://localhost:7000/api-docs/](http://localhost:7000/api-docs/)

### 6. Folder Structure

    |_src
        |_config    `Environment config`
        |_constants `Constants files`
        |_models    `Business models`
        |_routes    `Express routes`
        |_service   `Business logic`

## Watch Mode ( Nodemon )

To run in watch mode: `npm run watch`
