FROM node:slim

WORKDIR /journal-backend
COPY package*.json /journal-backend/
RUN npm install
RUN npm install nodemon -g
ENV PATH /journal-backend/node_modules/.bin:${PATH}
ENTRYPOINT [ "nodemon", "--legacy-watch", "--inspect=0.0.0.0", "./app.js"]

COPY . /journal-backend/