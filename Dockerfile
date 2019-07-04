FROM node:10-alpine as builder
COPY . /home/app
WORKDIR /home/app
# the following dependencies are needed to build native modules via node-gyp
RUN apk add --no-cache \
        python \
        make \
        g++
RUN npm install
ARG ENV_DB_HOST
ARG ENV_DB_PORT
ARG ENV_DB_NAME
ARG ENV_DB_PWD
ARG ENV_DB_USER

ENV DB_HOST=$ENV_DB_HOST
ENV DB_PORT=$ENV_DB_PORT
ENV DB_NAME=$ENV_DB_NAME
ENV DB_PWD=$ENV_DB_PWD
ENV DB_USER=$ENV_DB_USER
RUN npm test || echo "Unit Tests Failed"
RUN npm install --production

FROM node:10-alpine as production
COPY --from=builder /home/app /home/app
ARG ENV_DB_HOST
ARG ENV_DB_PORT
ARG ENV_DB_NAME
ARG ENV_DB_PWD
ARG ENV_DB_USER
ENV DB_HOST=$ENV_DB_HOST
ENV DB_PORT=$ENV_DB_PORT
ENV DB_NAME=$ENV_DB_NAME
ENV DB_PWD=$ENV_DB_PWD
ENV DB_USER=$ENV_DB_USER
WORKDIR /home/app
RUN npm install --production
ENTRYPOINT  NODE_ENV=production node src/index.js
EXPOSE 80
