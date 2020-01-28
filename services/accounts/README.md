# accounts

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# Backend Database (MySQL)
 - References : 
    - https://hub.docker.com/_/mysql
    - https://dev.mysql.com/doc/mysql-installation-excerpt/5.5/en/docker-mysql-getting-started.html

 - Commands to run MySQL Server as docker container:
``` 

docker run -it --rm --name local-mysql -e MYSQL_ROOT_PASSWORD=1SatnamW -d mysql

docker run -it --name=mysql-server -d mysql/mysql-server
docker logs mysql-server
docker logs mysql-server 2>&1 | grep GENERATED
Password Generated: YhMAM0g2IdErUcpos^yN@tbaJ7I

docker exec -it mysql-server mysql -uroot -p

ALTER USER 'root'@'localhost' IDENTIFIED BY '1SatnamW';
```

# Backend Database (PostgreSQL)

Start PostgreSQL on Mac OS
```
brew services start postgresql
```

# Backend Database (Cloudant)

docker run --detach --volume cloudant:/srv --name cloudant-developer --publish 8888:80 --hostname cloudant.dev ibmcom/cloudant-developer

# Run Locally

```

cd ../common
npm link
cd ../accounts
npm link ../common

npm run clean
npm run build
npm run migrate -- --rebuild
```

#### Using localtunnel 

Make sure localtunnel is installed globally on your local system

```
npm install -g localtunnel
```

```
lt --port 3000 --subdomain=smartthings-accounts --local-host "127.0.0.1" -o --print-requests
```

#### Using serveo.net

```
ssh -R smartthings-accounts.serveo.net:80:localhost:3000 serveo.net
```

Point your browser to https://smartthings-accounts.serveo.net to try out the app.

ALTERNATIVES

To create local certificates for SSL
openssl req -x509 -out ssl/pathway.serveo.net.crt -keyout ssl/pathway.serveo.net.key -newkey rsa:2048 -nodes -sha256

To Run app
sudo npm start --open --public pathway.serveo.net --port 443 --https --key "ssl/pathway.serveo.net.key" --cert "ssl/pathway.serveo.net.crt"



