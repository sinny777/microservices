# eval $(minikube docker-env)
# eval $(crc oc-env)

# python ../build_services.py -t latest -r sinny777 -P
# python ../build_services.py -t latest

# oc login --token=g56IlwMyI8nUhdtRiJ8ybpA9CsORN9RWPTEhVTGIb6Q --server=https://9.30.94.80:6443
# oc login --token=kSaAJq_Xyovlfz-GPV1fvp53urM9-cQof5AnyGFPIo0 --server=https://9.30.94.80:6443
# oc login --token=vdklYbF9D71OEYhoOqkNzjn98OgCAupwihL37ZKxEUs --server=https://c108-e.eu-gb.containers.cloud.ibm.com:31414

# oc login --token=OwtQXoJBfBiPqGGiyM5o2xELAcladyNl29N6CVS_HZ8 --server=https://api.ap45.prod.nextcle.com:6443

# oc create secret docker-registry docker-secret --docker-server=docker.io --docker-username=sinny777 --docker-password=DOCKER_PWD --docker-email=sinny777@gmail.com
# oc secrets link default docker-secret --for=pull


# oc adm policy add-scc-to-user privileged gurvinder
# oc adm policy add-scc-to-group privileged system:serviceaccount:smartthinngs:deployer

# oc auth can-i create pv --as developer


# oc policy add-role-to-user registry-viewer gurvinder
# oc policy add-role-to-user registry-editor gurvinder

# oc config set-context dev --namespace=smartthings \
#   --cluster=9.30.94.80:6443 \
#   --user=gurvinder

# oc config use-context dev

# oc project smartthings

# oc adm policy add-scc-to-user anyuid system:serviceaccount:smartthings:default


# oc new-app -e POSTGRESQL_USER=admin,POSTGRESQL_ADMIN_PASSWORD=1SatnamW,POSTGRESQL_PASSWORD=1SatnamW,POSTGRESQL_DATABASE=accounts registry.access.redhat.com/rhscl/postgresql-94-rhel7

# oc delete route mongodb-svc
# oc delete route ui-svc
# oc delete route iot-svc
# oc delete route account-svc
# oc delete route keycloak-svc
# oc delete -f local/services/web.yaml
# oc delete -f local/app-config.yaml
# oc delete -f local/app-secrets.yaml
# oc delete -f local/services/accounts-api.yaml
# oc delete -f local/services/iot-api.yaml
# oc delete -f local/services/mongodb/mongodb.yaml
# oc delete -f local/services/mongodb/mongo-storage.yaml
# oc delete -f local/auth/keycloak-deployment.yaml
# oc delete -f local/auth/postgres-deployment.yaml
# oc delete -f local/auth/postgres-storage.yaml
# oc delete -f local/auth/config/auth-config.yaml
# oc delete -f local/auth/config/auth-secrets.yaml

# sleep 3

# oc apply -f local/auth/config/auth-secrets.yaml
# oc apply -f local/auth/config/auth-config.yaml
# oc apply -f local/auth/postgres-storage.yaml
# oc apply -f local/auth/postgres-deployment.yaml
# oc apply -f local/auth/keycloak-deployment.yaml
# oc apply -f local/app-config.yaml
# oc apply -f local/app-secrets.yaml
# oc apply -f local/services/mongodb/mongo-storage.yaml
# oc apply -f local/services/mongodb/mongodb.yaml
# oc apply -f local/services/accounts-api.yaml
# oc apply -f local/services/iot-api.yaml
# oc apply -f local/services/web.yaml

# oc expose service keycloak-svc 
# oc expose service smartthings-account-svc 
# oc expose service smartthings-iot-svc 
# oc create route edge --service keycloak-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service mongodb-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service account-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service iot-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc create route edge --service ui-svc --key=local/keys/smartthings.key --cert=local/keys/smartthings.crt
# oc get route


sleep 5

# oc describe pods

