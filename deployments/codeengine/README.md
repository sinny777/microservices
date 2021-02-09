

```


ibmcloud iam oauth-tokens --output json

GUID c8275a43-2c60-42ab-bb6a-72bbc0acd72b

curl -X GET \
  'https://globalcatalog.cloud.ibm.com/api/v1?include=*&q=name:codeengine+active:true' \
  -H 'Authorization: Bearer ACCESS_TOKEN'

curl -X GET \
  'https://resource-controller.cloud.ibm.com/v2/resource_instances?name=MY_PROJECT&resource_id=RESOURCE_ID' \
  -H 'Authorization: Bearer ACCESS_TOKEN'


ibmcloud ce project select --name smartthings --kubecfg


ibmcloud iam api-key-create cliapikey -d "CodeEngineAPIKey" --file CodeEngineAPIKey


ibmcloud ce project create --name smartthings
ibmcloud ce project get --name smartthings

<!-- ibmcloud cr namespace-add smartthings
docker pull sinny777/smartthings-account:latest
docker tag smartthings-account:latest us.icr.io/smartthings/smartthings-account:latest
ibmcloud cr login
docker push us.icr.io/smartthings/smartthings-account:latest
ibmcloud ce build create --name smartthings-account --source https://github.ibm.com/gurvsin3/smartthings --context-dir /services/accounts --strategy kaniko --size medium --image docker.io/sinny777/smartthings-account:latest --registry-secret docker.io -->

ibmcloud ce build get --name smartthings-account
ibmcloud ce buildrun submit --name build-smartthings-account --build smartthings-account


ibmcloud ce secret delete --name auth-secrets
ibmcloud ce secret create --name auth-secrets --from-env-file secrets/auth-secrets.env
ibmcloud ce app create --name smartthings-keycloak --image docker.io/sinny777/smartthings-keycloak:latest --env-from-secret auth-secrets --min-scale 1 --cpu 4

ibmcloud ce app update --name smartthings-keycloak --env-from-secret auth-secrets


ibmcloud ce secret create --name app-secrets --from-env-file secrets/app-secrets.env
ibmcloud ce secret get --name app-secrets
ibmcloud ce secret delete --name app-secrets

ibmcloud ce app create --name smartthings-accounts --image docker.io/sinny777/smartthings-account:latest
ibmcloud ce app update --name smartthings-accounts --env-from-secret app-secrets --min-scale 1

ibmcloud ce app create --name smartthings-accounts --image docker.io/sinny777/smartthings-account:latest --env-from-secret app-secrets
ibmcloud ce app create --name smartthings-iot --image docker.io/sinny777/smartthings-iot:latest --env-from-secret app-secrets --min-scale 1


 ibmcloud ce app logs --app smartthings-keycloak


 awk -v ORS='\\n' '1' secrets/cert_v2.pem | pbcopy

 


```