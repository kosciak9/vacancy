FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

RUN node -v

COPY . /app/
