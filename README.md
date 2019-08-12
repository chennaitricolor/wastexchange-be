# Waste Exchange Backend

Backend for [indiawasteexchange.com](https://indiawasteexchange.com).

## Dev Machine Setup

1. Install [NodeJS 10.16 LTS](https://nodejs.org/en/)
2. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
3. Clone the [frontend](https://github.com/chennaitricolor/wastexchange-fe) and [backend](https://github.com/chennaitricolor/wastexchange-be) repositories. This setup assumes that both repositories are present in the same directory. For example:
	```
	chennaitricolor
	├── wastexchange-be
	└── wastexchange-fe
	```
4. Start dependencies (Postgres, frontend application):
    ```
    docker-compose up

    # OR to rebuild the docker images before starting the services
    docker-compose up --build
    ```
5. Install node dependencies:
    ```
    npm install
    ```
6. Creating migrations and seeds for the database

    * `npx sequelize migration:generate Create-Bids`
    * `npx sequelize-cli db:migrate`
    * `npx sequelize-cli db:migrate:undo:all`
    * `npx sequelize-cli seed:generate --name seed-bids`
    * `npx sequelize-cli db:seed:all`
    * `npx sequelize-cli db:seed:undo:all`

7. Start the application and watch for changes:
    ```
    ./local-startup.sh or ./local-startup.bat
    ```

## API References

### Swagger Endpoint

[http://localhost:7000/api-docs/](http://localhost:7000/api-docs/)

## Deployment

* Install Ansible 2.8.3
* Run the ansible playbook
	```
	ansible-playbook -i deployment/inventory.yaml \
		--private-key <ssh-private-key> \
		--extra-vars "env=<staging|prod> app_version=<docker-image-tag>" \
		--ask-vault-pass \
		deployment/playbook.yaml
	```
