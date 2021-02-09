# FROM postgres:alpine
FROM postgres:10.4

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER postgres

ARG uid=1000
ARG gid=1000

# Copy postgres config file into container
COPY postgresql.conf /etc/postgresql

# Override default postgres config file
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]