FROM node:10-alpine as builder

# TODO: Is there a reason why we need this multi-build pattern?
# we are only running npm install - which we are doing anyways in the production docker image as well

# Copy the 'package*.json' files first so as to reuse layers if there are no changes
COPY package*.json /home/app/
# the following dependencies are needed to build native modules via node-gyp
RUN apk add --no-cache \
  python \
  make \
  g++
WORKDIR /home/app
RUN npm install

COPY . /home/app

# TODO: What is the use of these lines in this image?
RUN env
RUN npm install --production

FROM node:10-alpine as production
COPY --from=builder /home/app /home/app
WORKDIR /home/app
RUN npm install --production
ENTRYPOINT NODE_ENV=production node src/index.js
EXPOSE 80
EXPOSE 443
