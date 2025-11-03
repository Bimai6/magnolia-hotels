FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]