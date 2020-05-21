
# Kubernetes Deployment for Smartthings - Microservices architecture

Go into the deployments>kube>local folder

## Local deployment on Kubernetes

### Create Users (Pending)

```
openssl genrsa -out developer.key 2048
openssl req -new -key developer.key -out developer.csr -subj "/CN=developer/O=IBM"

```

### Creating the Keys and Certificates

#### Create a public private key pair
```

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout smartthings.key -out smartthings.crt -subj "/CN=smartthings/O=smartthings"
```

#### Convert the keys to base64 encoding

```

cat smartthings.crt | base64
cat smartthings.key | base64
```

### Run/Delete Deployments

```

sh local_deploy.sh 
```


## Some other important commands

- To view Context details

```
kubectl config get-contexts

kubectl config view
```

- To remove contexts/clusters/users.  
kubectl config unset takes a dot-delimited path. You can delete cluster/context/user entries by name. e.g.

```
kubectl config unset users.kubeuser

kubectl config unset contexts.dev

kubectl config unset clusters.smartthings_kubernetes
```
- More

```
alias kcc='kubectl config current-context'
alias kuc='kubectl config use-context'

kubectl -n kube-system get pods
kubectl config view
kubectl config get-contexts

```