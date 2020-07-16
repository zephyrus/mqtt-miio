FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY index.js ./
COPY config.js ./
COPY state.js ./
COPY miio/ ./miio

CMD [ "npm", "start" ]