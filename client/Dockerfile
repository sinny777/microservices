##
## Copyright 2018 IBM Corporation
##
## This code is licensed only for use with IBM Watson Services
##

FROM node:10 as builder
ADD ./client /app/client
WORKDIR /app/client
RUN npm ci
RUN npm run build

FROM nginx:1.13.5
COPY --from=builder app/client/dist /usr/share/nginx/html
COPY --from=builder app/client/src/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD nginx -g "daemon off;";
