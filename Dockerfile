FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY source/backend/package.json source/backend/pooling-process.js /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD [ “npm”, “start” ]