FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY *.lock .

RUN yarn

COPY . .

CMD yarn start
