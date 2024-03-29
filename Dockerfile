FROM node:14-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN yarn install --network-timeout 1000000 --production=true
COPY . /app

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY server.js .
COPY --from=builder /app/build /app/build

RUN yarn install --network-timeout 1000000 --production=true

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]
