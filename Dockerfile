FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY /source/backend/package.json .
RUN npm install --quiet

COPY . .