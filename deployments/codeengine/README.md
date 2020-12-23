

```

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


ibmcloud ce secret create --name app-secrets --from-env-file secrets/app-secrets.env
ibmcloud ce secret get --name app-secrets
ibmcloud ce secret delete --name app-secrets

ibmcloud ce app create --name smartthings-accounts --image docker.io/sinny777/smartthings-account:latest 
ibmcloud ce app update --name smartthings-accounts --env-from-secret app-secrets

ibmcloud ce app create --name smartthings-iot --image docker.io/sinny777/smartthings-iot:latest --env-from-secret app-secrets


 ibmcloud ce app logs --app smartthings-iot


```