FROM node:16.15.0

#RUN apk add --no-cache bash
RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm i caniuse-lite
RUN npm run build

EXPOSE 8080

#COPY dist .

CMD [ "http-server", "dist"]
