
## USE gcloud CLI to deploy on Google App Engine 
## gcloud init
## gcloud app deploy

# FROM eu.gcr.io/my-google-project/keycloak-base-image:1.0

FROM docker.io/sinny777/smartthings-keycloak:latest

ENV DB_VENDOR postgres
ENV DB_ADDR 10.57.224.3
ENV DB_DATABASE auth_db
ENV DB_USER postgres
ENV DB_PASSWORD 1SatnamW
ENV PROXY_ADDRESS_FORWARDING true
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD P@ssw0rd

ENV JAVA_OPTS -server -Xms2048m -Xmx6144m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.byteman -Djava.awt.headless=true 
EXPOSE 8080