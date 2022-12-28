FROM node:16-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

RUN npm i -g nodemon

COPY . .

EXPOSE 2000

CMD nodemon app.js
