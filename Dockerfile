FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY source/backend/package.json source/backend/pooling-process.js /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3001
CMD [ “npm”, “start” ]