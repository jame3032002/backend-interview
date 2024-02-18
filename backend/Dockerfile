FROM node:20.11.0-alpine
WORKDIR /app
RUN apk update && \
    apk add --no-cache tzdata
COPY ./package.json .
RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]