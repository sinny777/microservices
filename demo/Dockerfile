FROM alpine:latest
COPY /services /usr/local/smartthings/services
COPY /client /usr/local/smartthings/client
COPY /demo/setupProxy.js /usr/local/smartthings/client/src
WORKDIR /usr/local/smartthings
COPY /demo/util/init.sh /usr/local/smartthings/util/init.sh
RUN sh ./util/init.sh
COPY /demo/util/install-dependencies.sh /usr/local/smartthings/util/install-dependencies.sh
RUN sh ./util/install-dependencies.sh
COPY /demo/util/start-apps.sh /usr/local/smartthings/util/start-apps.sh

EXPOSE 443

CMD ["sh", "./util/start-apps.sh"]