FROM quay.io/keycloak/keycloak:10.0.1

LABEL maintainer = "Gurvinder Singh <sinny777@gmail.com>"

# Initial account credentials
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD P@ssw0rd

# Set to true for running behind Heroku's load balancers
ENV PROXY_ADDRESS_FORWARDING true

# RUN mkdir -p /opt/jboss/keycloak/tools
RUN mkdir -p /opt/jboss/keycloak/config
RUN mkdir -p /opt/jboss/keycloak/themes/auth_app

ADD ./config/dev-realm-export.json /opt/jboss/keycloak/campaign

# COPY docker-entrypoint.sh /opt/jboss/keycloak/tools
COPY themes/auth_app /opt/jboss/keycloak/themes/auth_app

RUN ls /opt/jboss/tools/

# COPY ./config /config/
# ADD ./config /config/

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Dkeycloak.profile.feature.upload_scripts=enabled", "-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=dir", "-Dkeycloak.migration.dir=/opt/jboss/keycloak/config", "-Dkeycloak.migration.strategy=IGNORE_EXISTING"]
