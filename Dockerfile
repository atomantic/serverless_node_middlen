FROM node:11.7.0-alpine

RUN mkdir /app

EXPOSE 3000

COPY app /app

WORKDIR /app
RUN npm i

CMD [ "npm", "start" ]