FROM node:16-alpine as prod-lib-builder

# Build types
COPY package.json .
COPY types types
RUN yarn --cwd types install
RUN yarn --cwd types build

# Get libs needed at runtime by prod
COPY server/package.json server/package.json
RUN NODE_ENV=production yarn add-types:server


FROM node:16-alpine as server-builder

RUN npm install -g typescript

# Build types
COPY package.json .
COPY types types
RUN yarn --cwd types install
RUN yarn --cwd types build

# Install dependencies
COPY server/package.json server/package.json
RUN yarn add-types:server

# Build the server
COPY server server
RUN yarn --cwd server build


FROM node:16-alpine as client-builder

# Build types
COPY package.json .
COPY types types
RUN yarn --cwd types install
RUN yarn --cwd types build

# Install dependencies
COPY client/package.json client/package.json
RUN yarn add-types:client

# Build the client
COPY client client
RUN yarn --cwd client build


FROM node:16-alpine

# Install a static server and tools
RUN npm install -g serve concurrently

WORKDIR /usr/src/app

# Copy the server app
COPY --from=prod-lib-builder server/node_modules node_modules
COPY --from=server-builder server/dist dist

# Copy the frontend app
COPY --from=client-builder client/build dist/build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
