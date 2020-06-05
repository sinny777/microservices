# Deployment on Kubernetes


## Remove all dangling Docker images
docker rmi $(docker images -f "dangling=true" -q)

## Keycloak Public Key

 - Fetch details of Keycloak Public Key using this call
    {{keycloak_url}}/auth/realms/{{keycloak_realm}}/protocol/openid-connect/certs

 - JWK to PEM Convertor online
     https://8gwifi.org/jwkconvertfunctions.jsp
 - Copy the PEM format of Public key for further use


## Converting Public/private keys anc certs into single line

```

awk -v ORS='\\n' '1' keys/keycloak-public.key | pbcopy
```