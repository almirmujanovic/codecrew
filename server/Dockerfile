FROM node:20-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV NODE_ENV development

CMD ["npm", "run", "dev"]
