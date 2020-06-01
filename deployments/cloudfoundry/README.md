# Deployment on IBM Cloud - Cloudfoundry

## Prerequisites

    - Before you begin, [download and install the IBM Cloud CLI.](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started&locale=en-GB)

## Deployment

    - Make sure you are inside "deployments > cloudfoundry"  folder

```
ibmcloud install cf
ibmcloud cf push
```

### Troubleshooting

 - Run ibmcloud ibmcloud cf app MY-AWESOME-APP --guid and record the GUID of your target app.
 - Query the /v2/info endpoint of the Cloud Controller in your deployment. Record the domain name and port of the app_ssh_endpoint field, and the app_ssh_host_key_fingerprint field. You will compare the app_ssh_host_key_fingerprint with the fingerprint returned by the SSH proxy on your target VM. 
    - ibmcloud cf curl /v2/info
 - Run cf ssh-code to obtain a one-time authorization code that substitutes for an SSH password. You can run cf ssh-code | pbcopy to automatically copy the code to the clipboard. 
    - ibmcloud cf ssh-code
 - Run your ssh or other command to connect to the app instance. For the username, use a string of the form cf:APP-GUID/APP-INSTANCE-INDEX@SSH-ENDPOINT, where APP-GUID and SSH-ENDPOINT come from the previous steps. For the port number, use the SSH-PORT recorded above. APP-INSTANCE-INDEX is the index of the instance you want to access. 
    - $ ssh -p 2222 cf:abcdefab-1234-5678-abcd-1234abcd1234/0@ssh.MY-DOMAIN.com