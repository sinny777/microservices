# eval $(minikube docker-env)

# python ../build_services.py -t latest -r sinny777 -P
# python ../build_services.py -t localtag

# kubectl create -f local/namespaces/namespace-dev.json
# kubectl config set-context dev --namespace=smartthings-dev \
#   --cluster=docker-desktop \
#   --user=docker-desktop

kubectl config use-context dev

# kubectl apply -f local/auth/config/auth-secrets.yaml
# kubectl apply -f local/auth/config/auth-config.yaml
# kubectl apply -f local/auth/postgres-storage.yaml
# kubectl apply -f local/auth/postgres-deployment.yaml
# kubectl apply -f local/auth/keycloak-deployment.yaml
# kubectl apply -f local/app-config.yaml
# kubectl apply -f local/app-secrets.yaml
# kubectl apply -f local/services/mongodb.yaml
# kubectl apply -f local/services/accounts-api.yaml
# kubectl apply -f local/services/iot-api.yaml
# kubectl apply -f local/services/web.yaml
# kubectl apply -f local/ingress.yaml



# kubectl delete -f local/ingress.yaml
# kubectl delete -f local/services/web.yaml
# kubectl delete -f local/services/accounts-api.yaml
# kubectl delete -f local/services/iot-api.yaml
# kubectl delete -f local/app-secrets.yaml
# kubectl delete -f local/app-config.yaml
# kubectl delete -f local/services/mongodb.yaml
# kubectl delete -f local/auth/keycloak-deployment.yaml
# kubectl delete -f local/auth/postgres-deployment.yaml
# kubectl delete -f local/auth/postgres-storage.yaml
# kubectl delete -f local/auth/config/auth-config.yaml
# kubectl delete -f local/auth/config/auth-secrets.yaml

sleep 5

# open https://minikube.info

# kubectl describe pods