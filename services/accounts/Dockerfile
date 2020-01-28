
FROM node:12-slim

# Set to a non-root built-in user `node`
# USER node
# Create app directory (with user `node`)
# RUN mkdir -p /home/node/app
# WORKDIR /home/node/app

RUN npm install -g nodemon
ADD ./services/accounts /app
ADD ./services/core /app/core
WORKDIR /app
RUN npm ci
RUN npm link /app/core
RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
# ENV HOST=0.0.0.0 PORT=3000
# EXPOSE ${PORT}

CMD [ "node", "." ]