FROM node

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install
RUN npm run start:dev

COPY . .