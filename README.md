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


## Demo
http://165.227.5.206:8888

<img width="500" alt="Screen Shot 2022-01-24 at 2 14 54 PM" src="https://user-images.githubusercontent.com/3991678/150731416-77dfdd56-a5f4-4679-8e8c-129e73855b10.png">
