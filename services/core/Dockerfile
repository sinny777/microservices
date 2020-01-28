
FROM node:12-slim
RUN npm install -g nodemon
ADD ./app/core /app
# ADD ./app/common /app/common
WORKDIR /app
RUN npm ci
RUN npm link /app/core
CMD ["node", "."]
