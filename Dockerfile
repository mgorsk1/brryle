FROM node:14-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm install
COPY . /app

RUN npm run build

FROM node:latest

WORKDIR /app

COPY package.json .
COPY server.js .
COPY --from=builder /app/build /app/build

RUN npm instal

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]