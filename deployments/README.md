# Deployment on Kubernetes


## Remove all dangling Docker images
docker rmi $(docker images -f "dangling=true" -q)

## Converting Public/private keys anc certs into single line

```

awk -v ORS='\\n' '1' keys/keycloak-public.key | pbcopy
```