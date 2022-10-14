FROM node:16-alpine as builder

# Build types
COPY types types
RUN yarn --cwd types install
RUN yarn --cwd types build


######### Build the client
# Add types to client
COPY package.json .
COPY client client
RUN yarn add-types:client

# Build the client
RUN yarn --cwd client build
# Hacky. Re-install the dependecies, but for the prod libs only
RUN NODE_ENV=production yarn --cwd client install #IS this needed?

####### Build the server
# Add types to server
COPY package.json .
COPY server server
RUN yarn add-types:server

# Build the server
RUN yarn --cwd server build
# Hacky. Re-install the dependecies, but for the prod libs only
RUN NODE_ENV=production yarn --cwd server install



FROM node:16-alpine

# Install a static server and tools
RUN npm install -g serve concurrently

WORKDIR /usr/src/app

# Copy the server app
COPY --from=builder server/dist dist
COPY --from=builder server/node_modules node_modules

# Copy the frontend app
COPY --from=builder client/build dist/build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
