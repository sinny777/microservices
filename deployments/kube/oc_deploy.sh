# eval $(minikube docker-env)
# eval $(crc oc-env)

# python ../build_services.py -t latest -r sinny777 -P
# python ../build_services.py -t latest

# oc login --token=MudNqLbKRzCTavWt9SIulnaAr0PEua7aDSOdeLZlRcc --server=https://9.30.213.241:6443

# oc policy add-role-to-user registry-viewer gurvinder
# oc policy add-role-to-user registry-editor gurvinder

# oc config set-context dev --namespace=smartthings \
#   --cluster=9.30.213.241:6443 \
#   --user=gurvinder

# oc config use-context dev

# oc project smartthings

# oc delete route iot-svc
# oc delete route account-svc
# oc delete route keycloak-svc
# oc delete -f local/services/web.yaml
# oc delete -f local/services/accounts-api.yaml
# oc delete -f local/services/iot-api.yaml
# oc delete -f local/app-secrets.yaml
# oc delete -f local/app-config.yaml
# oc delete -f local/services/mongodb.yaml
# oc delete -f local/auth/keycloak-deployment.yaml
# oc delete -f local/auth/postgres-deployment.yaml
# oc delete -f local/auth/postgres-storage.yaml
# oc delete -f local/auth/config/auth-config.yaml
# oc delete -f local/auth/config/auth-secrets.yaml



# oc apply -f local/auth/config/auth-secrets.yaml
# oc apply -f local/auth/config/auth-config.yaml
# oc apply -f local/auth/postgres-storage.yaml
# oc apply -f local/auth/postgres-deployment.yaml
# oc apply -f local/auth/keycloak-deployment.yaml
# oc apply -f local/app-config.yaml
# oc apply -f local/app-secrets.yaml
# oc apply -f local/services/mongodb.yaml
# oc apply -f local/services/accounts-api.yaml
# oc apply -f local/services/iot-api.yaml
# oc apply -f local/services/web.yaml

# oc expose service keycloak-svc 
# oc expose service smartthings-account-svc 
# oc expose service smartthings-iot-svc 
# oc create route edge --service keycloak-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service account-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service iot-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service ui-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc get route


sleep 5

# oc describe pods