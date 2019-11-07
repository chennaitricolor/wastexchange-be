# Waste Exchange Backend

Backend for [indiawasteexchange.com](https://www.indiawasteexchange.com/).

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
6. Creating migrations and seeds for the database (_ONLY FYI - not needed if you are not going to edit the db schema_)

    * `npx sequelize migration:generate --name Create-Bids`
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

### Build and Push Docker Image

```
# build
docker build -t chennaitricolor/wastexchange-be:$(git rev-parse --short HEAD) -t chennaitricolor/wastexchange-be:latest -f Dockerfile .

# push
docker push chennaitricolor/wastexchange-be:$(git rev-parse --short HEAD)
docker push chennaitricolor/wastexchange-be:latest
```

### Deploy Docker Image

* Install Ansible 2.8.3
* Run the ansible playbook
  ```
  ansible-playbook -i deployment/inventory.yaml \
    --private-key <ssh-private-key> \
    --extra-vars "env=<staging|production> app_version=$(git rev-parse --short HEAD)" \
    --ask-vault-pass \
    deployment/playbook.yaml
  ```
* Data about the running instances can be found [here](deployment/inventory.yaml)
* Sensitive info can be found [here](deployment/group_vars/staging/vault.yaml) - but, for which you will need to contact one of the codebase-admins for decryption.

### Interesting urls:

| Env | URL |
| --- | --- |
| Staging env (BE) | https://staging-env.indiawasteexchange.com/api/ |
| Production env (BE) | https://www.indiawasteexchange.com/api/ |
| CI | |
| Trello | https://trello.com/b/LxUGt20J/waste-exchange |


### To connect to the AWS db from local
```
ssh -i <ssh-key-file> -L 5000:<rds-endpoint>:5432 ubuntu@<ec2-instance-name>
```
IN a DIFFERENT terminal tab:
If needing password/other details for db connection, need to decrypt the vault.yml file for the appropriate env:
```
ansible-vault decrypt deployment/group_vars/production/vault.yaml
```
Using the values from the decrypted file, connect to the psql db:
```
psql -h localhost -p 5000 -U <db-username> <db-name>
```
TERMINATE the ssl connection!!!!!
