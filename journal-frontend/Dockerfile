FROM node:slim

WORKDIR /journal-frontend
COPY package*.json /journal-frontend/
RUN npm install
RUN npm install nodemon -g
COPY . /journal-frontend/
EXPOSE 3000