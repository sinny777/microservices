# [Micro Services](https://smart-things.mybluemix.net) - Micro Services Architecture

## Table of Contents
* [Introduction](#introduction)
* [Architecture Design](#architecture-design)
* [How it Works](#how-it-works)
* [Run Locally](#run-locally)
  * [Getting Started](#getting-started)
  * [Setting Local Environment](#setting-local-environment)
  * [Application Configurations](#application-configurations)
  * [Running the App](#running-the-app)  
* [License](#license)
* [References](#references)

## INTRODUCTION

This repository can help you quickly getting started with IBM Watson IoT Platform and takes Smart Things like Smart City/Smart Place as usecases.

This shows the capabilities of [IBM Watson IoT Platform](https://console.bluemix.net/docs/services/conversation/index.html#about)

### Demo URL: [https://carbonui-microservices.mybluemix.net](https://carbonui-microservices.mybluemix.net)

## HOW IT WORKS

Under the hood, there are two components to this app:
* Front-end (Angular based), which is simply static assets (HTML, CSS and JS etc.)
* Other component is the nodejs (Loopback framework) based server side logic

## BUILD LOCALLY

### USING DOCKER COMPOSE

Go inside deployments folder and run following commands:

```
docker-compose down && docker-compose build --no-cache && docker-compose up

```

This will run Postgres and Keycloak containers

### Keycloak Details

 - Keycloak Dashboard: [http://localhost:8888](http://localhost:8888)
   Admin Credentials: admin / P@ssw0rd
 - OAuth2.0 configuration: [http://localhost:8888/auth/realms/development/.well-known/openid-configuration](http://localhost:8888/auth/realms/development/.well-known/openid-configuration)  


### USING DOCKER 

These builds can be scripted. When scripting the builds, consideration should be given to the chosen tags so that historical versions are preserved.

A sample scripted build is provided at `/build_services.py` 

An example execution of this script is included below:

```
// local docker daemon build
python3 build_services.py -t localtag

// repo docker daemon build
python3 build_services.py -t localtag -r myrepo
```

## RUN LOCALLY

### Run Accounts API as Docker container 

```
docker run -it -p 3000:3000 --name accounts --hostname accounts.local --env-file .env microservices/accounts:localtag
```

### Getting Started

1. If you don't already have an IBM Cloud account, you can sign up [here](https://console.bluemix.net/?cm_mmc=GitHubReadMe)
> First of all create a Cloudfoundry applicaiton on IBM Cloud.  Create a Node JS starter application (Catalog -> Cloud Foundry apps -> SDK for Node JS), and bind following services to it:
  - CloudantNoSQL DB
  - Watson IoT Platform

2. Clone (or fork) this repository, and go to the new directory
```bash
git clone https://git.ng.bluemix.net/gurvsin3/smart-things.git
cd smart-things
```

3. Install [Node.js](https://nodejs.org) (Versions >= 8).

4. In the root directory of your repository, install the project dependencies.
```bash
npm install
```

#### Issues running on Windows Machine
There are a few issues you may face while trying to run the application on a Windows machine:
  - Issue related to node-gyp rebuild, “The build tools for v141 (Platform tools) not found” error
    Resolution: Run following command to install windows build tools.

    ```bash
    npm install --global --production windows-build-tools
    ```

  - dezalgo ENOENT npm install error
    Resolution: npm can be upgraded by running the following command

    ```bash
    npm i -g npm
    ```

  - Fatal error LNK1181: cannot open input file c:\OpenSSL-Win64\lib\libeay32.lib
    Resolution: Install OpenSSL in default path, after which the required lib file will be in place. https://www.openssl.org/

### Setting local environment

Copy the contents of .env.example file in root directory to .env file and replace the values for each property as per your application requirement

#### Setting Front end

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.43.

#### Client side build (Using Angular)

```bash
cd client
npm install
ng build --prod=false --baseHref=/
```

> Make sure you make the changes under the "environments" folder as per your application created on IBM Cloud (specially in environment.prod.ts file).  This will be used once you deploy the app to IBM Cloud


#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

#### Setting Server Side Code

Install the demo app package into the local Node.js runtime environment.  Run below command in the root folder of the app:

    ```bash
    npm install
    ```

### Application Configurations

Once your app is running on port 3000 (http://localhost:3000), the first thing you need to do is to configure your application.  There are following steps required:

1. In your CloudantDB, create following datasources (all smallcase):

* accounts
* identities
* mappings
* roles
* rolemappings

2. You need a make a POST REST call with data in following JSON format:

```
{
        "key": "APP_CONFIG",
        "output": {
            "WEATHER_USERNAME": "6be9a18a-fafd-4582-9dad-1234abcdxyz",
            "WEATHER_PASSWORD": "mqZtnVE4mJ",
            "WEATHER_URL": "https://6be9a18a-fafd-4582-9dad-1234abcdxyz:mqAtbcX4mJ@twcservice.mybluemix.net",
            "CLOUD_FUNCTIONS_CREDENTIALS": "b91976bd-22e8-4f8f-acd1-1234abcdxyz:jvUvYRsFHo3Hj80ZsPKD6HVDMJHA55vKd2fcMGrR3FheUZ0J4p1234abcdxyz",
            "MQTT_HOST_URL": "https://abcdef.messaging.internetofthings.ibmcloud.com",
            "MQTT_CLIENT_ID": "A:abcdef:a-abcdef-6p40abcnv9",
            "MQTT_USER": "a-abcdef-6p40abcnv9",
            "MQTT_PASSWORD": "0A@g&bdxUyfsFp@ys7"
        }
    }
```
* METHOD: POST
* ENDPOINT_URL: http://localhost:3000/api/Mappings
* HEADERS:
  > Accept: application/json
  > Content-Type: application/json
  > X-IBM-client-Id: default
  > X-IBM-client-Secret: SECRET

### Running the App

**There are two ways of running this app.**

1. Both Server side and client side build together on a single port (3000)

    ```bash
    npm run serve
    ```

2. Running both standalone

a. Start the server side app (NodeJs - Loopback framework based):

    ```bash
    npm start
    ```
    Now your server side application should be running on port 3000 (http://localhost:3000)

b. In new terminal tab, install Client build dependencies

  ```bash
  cd client
  npm install
  ```
c. Run the Client side build (Angular framework)

  ```bash
  ng serve
  ```
  Now static build should be running on port 4200 (http://localhost:4200)

e. Point your browser to http://localhost:4200 to try out the app.

### To run the app on localhost using https:

ssh -R smart-things.serveo.net:80:localhost:3000 serveo.net

### Keycloak

 - Start PostgreSql docker container for Keycloak

docker run -d --name postgres --net keycloak-network -p 5432:5432 -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak -e POSTGRES_PASSWORD=password postgres


docker run --name keycloak --net keycloak-network -p 8080:8080 -p 9990:9990 -e DB_USER=keycloak -e DB_PASSWORD=password -e DB_VENDOR=postgres -e DB_ADDR=postgres jboss/keycloak

docker run --name keycloak -p 8080:8080 -p 9990:9990 --env-file auth-secrets.env sinny777/smartthings-keycloak:latest

 - Create Admin user 

docker exec <CONTAINER> /opt/jboss/keycloak/bin/add-user-keycloak.sh -u <USERNAME> -p <PASSWORD>

For eg. >> docker exec be795ff39675 /opt/jboss/keycloak/bin/add-user-keycloak.sh -u admin -p 1SatnamW

 - Restart Container
 docker restart <CONTAINER>

## LICENSE

This sample code is licensed under Apache 2.0.
Full license text is available in [LICENSE](LICENSE).

## REFERENCES

- [IBM_sign_up](http://bluemix.net/registration)
- [IBM Cloudant NoSQLDB](https://cloud.ibm.com/docs/services/Cloudant?topic=cloudant-overview#overview)
- [NodeJs](http://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Loopback](https://loopback.io/doc/en/lb3/index.html)
- [Loopback 4](https://developer.ibm.com/tutorials/create-rest-apis-minutes-with-loopback-4/)
- [Angular](https://angular.io/guide/quickstart)
- [cf_docs](https://www.ibm.com/watson/developercloud/doc/common/getting-started-cf.html)
- [cloud_foundry](https://github.com/cloudfoundry/cli#downloads)
- [kong - API Gateway](https://medium.com/@far3ns/kong-the-microservice-api-gateway-526c4ca0cfa6)
- [NGINX reference](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
- [IoT Datasets](https://github.com/thieu1995/iot_dataset)

