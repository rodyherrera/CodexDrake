FROM node:18-alpine3.17 as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force --silent
COPY . .
CMD ["npm", "run", "start"]