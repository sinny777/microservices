FROM quay.io/keycloak/keycloak:10.0.1

LABEL authors="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

# Initial account credentials
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD 1SatnamW
ENV PROXY_ADDRESS_FORWARDING true
ENV KEYCLOAK_IMPORT /tmp/ibm-realm.json

# RUN mkdir -p /opt/jboss/keycloak/tools
RUN mkdir -p /opt/jboss/keycloak/config
RUN mkdir -p /opt/jboss/keycloak/themes/auth_app

ADD ./config/ibm-realm-export.json /opt/jboss/keycloak/campaign

# COPY docker-entrypoint.sh /opt/jboss/keycloak/tools
COPY themes/auth_app /opt/jboss/keycloak/themes/auth_app
COPY config/ibm-realm.json /tmp/ibm-realm.json

RUN ls /opt/jboss/tools/

# COPY ./config /config/
# ADD ./config /config/
# /opt/jboss/keycloak/standalone/configuration/keycloak-add-user.json

EXPOSE 22
ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Djboss.as.management.blocking.timeout=3600", "-Dkeycloak.profile.feature.upload_scripts=enabled", "-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=dir", "-Dkeycloak.migration.dir=/opt/jboss/keycloak/config", "-Dkeycloak.migration.strategy=IGNORE_EXISTING"]
