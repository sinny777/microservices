

#OpenShift

Install Reference: https://www.youtube.com/watch?v=zegvkCancuw
https://code-ready.github.io/crc/



## Configure Access to system:admin User
Copy the kubeconfig created by the OpenShift Container Platform installation to your user’s $HOME/.kube/config location:

$ cp $HOME/cluster-$GUID/auth/kubeconfig $HOME/.kube/config

Confirm that your kubeconfig admin user corresponds to the system:admin cluster account:

$ oc --user=admin whoami
system:admin

## Configure Local Password Identity Provider
The identity provider for OpenShift that is simplest to use is the HTPasswd identity provider, which uses user passwords stored in the cluster etcd storage as a secret. In this section, you configure an HTPasswd identity provider.

### 2.1. Create HTPasswd Secret

You start by configuring a local secret called htpasswd in the openshift-config namespace containing the users alice, bob, and claire. You set the password for each user to p4ssw0rd.

Create an empty file called htpasswd:

$ touch htpasswd

Use htpasswd to set the password for the alice, bob, and claire users to p4ssw0rd:

$ htpasswd -Bb htpasswd alice p4ssw0rd
$ htpasswd -Bb htpasswd bob p4ssw0rd
$ htpasswd -Bb htpasswd claire p4ssw0rd

Create the htpasswd secret from the htpasswd file in the openshift-config namespace:

$ oc --user=admin create secret generic htpasswd \
    --from-file=htpasswd -n openshift-config

### 2.2. Configure OAuth Identity Provider for HTPasswd and Test

- 1: Create a file called $HOME/oauth-config.yaml with the following contents:

    apiVersion: config.openshift.io/v1
    kind: OAuth
    metadata:
      name: cluster
    spec:
      identityProviders:
      - name: Local Password
        mappingMethod: claim
        type: HTPasswd
        htpasswd:
          fileData:
            name: htpasswd

- 2: Replace the cluster OAuth configuration with the HTPasswd version in the oauth-config.yaml file:

$ oc --user=admin replace -f oauth-config.yaml
oauth.config.openshift.io/cluster replaced

- 3: Retrieve the web console URL, open a browser window, paste the web console URL, and test the login with the Local Password identity provider, using alice as the user and p4ssw0rd as the password:

$ oc whoami --show-console

=> You may need to access a self-signed certificate twice—once for the web console and once for the OAuth endpoint.

- 4: In the top right corner, click the username, then click Logout to log out of your web browser.

- 5: Retrieve the API URL and test the login using the command line, specifying bob as the user and p4ssw0rd as the password:

$ API_URL=$(oc whoami --show-server)
$ oc login -u bob -p p4ssw0rd $API_URL
Login successful.

You dont have any projects. You can try to create a new project, by running

    oc new-project <projectname>

$ oc whoami
bob

- 6: List the users and their identities to view the dynamically created entries:
$ oc --user=admin get users

### Disable kubeadmin Account

Because you have direct access as the system:admin account using the kubeconfig installer file, you do not need the kubeadmin account to be active in the cluster. In this section, you disable the kubeadmin account by removing the password secret.

    Delete the kubeadmin secret from the kube-system namespace:

    $ oc --user=admin delete secret kubeadmin -n kube-system
    secret "kubeadmin" deleted

    Confirm that the kubeadmin user is no longer accessible:

    $ API_URL=$(oc whoami --show-server)
    $ KUBEADMIN_PASSWORD="$(cat $HOME/cluster-$GUID/auth/kubeadmin-password)"
    $ oc login -u kubeadmin -p "$KUBEADMIN_PASSWORD" "$API_URL"
    Login failed (401 Unauthorized)
    Verify you have provided correct credentials.

    Use TLS authentication to confirm that system:admin account is still available:

    $ oc --user=admin whoami
    system:admin







$ API_URL=$(oc whoami --show-server)
$ oc login -u bob -p p4ssw0rd $API_URL
Login successful.

You dont have any projects. You can try to create a new project, by running

    oc new-project <projectname>

$ oc whoami
bob



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