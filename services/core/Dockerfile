
FROM node:12-slim

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

RUN npm install -g nodemon
ADD ./services/core /services
# ADD ./app/common /app/common
WORKDIR /services
RUN npm ci
RUN npm link /services/core
CMD ["node", "."]
