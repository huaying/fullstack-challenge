FROM node:16.13-alpine3.14
LABEL maintainer="royal3501@gmail.com"

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 8080
CMD ["yarn", "dev"]