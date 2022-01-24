# DeBlog

## Design

https://github.com/huaying/fullstack-challenge/blob/master/DesignDocs.md

## Prerequisite

Install docker, docker-compose and yarn

## Start the service

1. Server

```
# It starts the ipfs service and the api server.
docker-compose up
```

2. Client

```
# nvm 14
cd ./client
yarn install && yarn start

# defualt graphql url is http://localhost:8000
# to specify the endpoint:
GRAPHQL_API={API_URL} yarn start
```
