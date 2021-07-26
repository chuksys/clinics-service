FROM node:14-alpine

WORKDIR /clinics-service

COPY package.json package-lock.json ./
RUN npm install

CMD ["npm", "start"]