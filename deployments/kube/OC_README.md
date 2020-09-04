

OpenShift

Install Reference: https://www.youtube.com/watch?v=zegvkCancuw
https://code-ready.github.io/crc/

Credentials for Developer: developer/developer

To access the cluster, first set up your environment by following 'crc oc-env' instructions 
INFO Then you can access it by running 'oc login -u developer -p developer https://api.crc.testing:6443' 
INFO To login as an admin, run 'oc login -u kubeadmin -p ILWgF-VfgcQ-p6mJ4-Jztez https://api.crc.testing:6443' 

Some Important Commands for Code Ready Containers (CRC)

eval $(crc oc-env)

crc start -p ./crc-macos-1.15.0-amd64/pull-secret.txt
crc stop
crc delete


Access the Openshift Internal Image Registry
Reference: https://github.com/IBM/cloud-native-starter/blob/master/documentation/OS4Requirements.md#access-the-openshift-internal-image-registry

oc registery info

Docker Image Registery: 
default-route-openshift-image-registry.apps-crc.testing


oc login -u kubeadmin
oc policy add-role-to-user registry-viewer developer
oc policy add-role-to-user registry-editor developer
Now edit the restricted SCC policy as follows:
oc edit scc restricted
change the following values:

allowHostDirVolumePlugin: true
allowHostNetwork: true
allowPrivilegedContainer: true
runAsUser:
  type: RunAsAny
seLinuxContext:
  type: RunAsAny
-----
oc logout
oc login -u developer -p developer
docker login -u developer -p $(oc whoami -t) default-route-openshift-image-registry.apps-crc.testing

Obtain the CA Certificate from Openshift
oc extract secret/router-ca --keys=tls.crt -n openshift-ingress-operator --confirm
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain tls.crt
security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain tls.crt

Obtain Image Registry URL:
oc get route default-route -n openshift-image-registry --template='{{ .spec.host }}'

Expose the registry using ‘DefaultRoute’:
oc patch configs.imageregistry.operator.openshift.io/cluster --patch '{"spec":{"defaultRoute":true}}' --type=merge

Get the URL of the Route:
oc get route default-route -n openshift-image-registry --template='{{ .spec.host }}'

docker login -u `kubeadmin` -p `oc whoami --show-token` default-route-openshift-image-registry.apps-crc.testing
docker login -u kubeadmin -p ILWgF-VfgcQ-p6mJ4-Jztez default-route-openshift-image-registry.apps-crc.testing
oc create imagestream smartthings-keycloak
docker tag smartthings-keycloak:latest default-route-openshift-image-registry.apps-crc.testing/smartthings/smartthings-keycloak:latest
docker push default-route-openshift-image-registry.apps-crc.testing/smartthings/smartthings-keycloak:latest
——————

oc --namespace openshift-ingress create secret tls custom-certs-default --cert=smartthings.crt --key smartthings.key

oc patch --type=merge --namespace openshift-ingress-operator ingresscontrollers/default \
  --patch '{"spec":{"defaultCertificate":{"name":"custom-certs-default"}}}'