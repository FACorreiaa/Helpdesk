# FROM node:8-alpine

# EXPOSE 3000

# #ARG NODE_ENV
# #ENV NODE_ENV $NODE_ENV
# #docker run --rm -d -p 3000:3000/tcp testedocker:latest
# #docker run -it testedocker npm i

# RUN mkdir /app
# WORKDIR /app
# ADD ./source/backend/package.json ./source/backend/pooling-process.js /app/
# RUN npm install
# ADD . /app

# CMD ["npm", "pooling", "start"]

FROM node:10-slim

# Set environment variable with the address of the REST API
# This will be used during the build stage of react app 
#ENV REACT_APP_REST_API http://localhost:80/v1/cities/

# make dir
RUN mkdir /app

# copy apps to container
ADD ./source/backend /app/backend
ADD ./source/frontend /app/frontend

# install dependencies
WORKDIR /app/backend
RUN npm i

# install dependencies and build react app
WORKDIR /app/frontend
RUN npm i
RUN npm run build

# copy build app to express public folder
RUN cp -r /app/frontend/build/* /app/backend/public

# clean up
RUN rm -rf /app/frontend

EXPOSE 3000

# set environment for production
#ENV NODE_ENV=production

# start the app
WORKDIR /app/backend
CMD npm install && npm pooling && npm start
