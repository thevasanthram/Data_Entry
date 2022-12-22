FROM node:10

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

RUN npm i -g nodemon

COPY . .

EXPOSE 8000

RUN node app.js
