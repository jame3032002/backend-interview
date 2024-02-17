FROM mongo:6.0.2

WORKDIR /seed-data
COPY ./seed-data .

COPY init-mongo.js /docker-entrypoint-initdb.d/