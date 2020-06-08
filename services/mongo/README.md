# Installation of MongoDB Enterprise

## Download the Docker build files for MongoDB Enterprise

```

export MONGODB_VERSION=4.2
curl -O --remote-name-all https://raw.githubusercontent.com/docker-library/mongo/master/$MONGODB_VERSION/{Dockerfile,docker-entrypoint.sh}
```

## Build the Docker container

```

export DOCKER_USERNAME=username
chmod 755 ./docker-entrypoint.sh
docker build --build-arg MONGO_PACKAGE=mongodb-enterprise --build-arg MONGO_REPO=repo.mongodb.com -t $DOCKER_USERNAME/mongo-enterprise:$MONGODB_VERSION .
```

## Test your image

```

docker run --name mymongo -itd $DOCKER_USERNAME/mongo-enterprise:$MONGODB_VERSION
docker exec -it mymongo /usr/bin/mongo --eval "db.version()"
```

## Push your image to Docker Hub

```

docker login
docker push $DOCKER_USERNAME/mongo-enterprise:$MONGODB_VERSION
```

## Run Docker container

```

docker run --name mymongo -itd -p 27017:27017 $DOCKER_USERNAME/mongo-enterprise:$MONGODB_VERSION
```

## Manage / UI for MongoDB

You can use Mongo compass for managing or for working on UI interface
