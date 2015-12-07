#
# This Dockerfile is very basic and a work-in-progress
#

FROM node:4.2-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g bower
RUN npm install

RUN npm run build

EXPOSE 3000 9000

CMD ["npm", "start"]