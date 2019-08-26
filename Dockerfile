FROM node:10-alpine

RUN apk --no-cache add -U netcat-openbsd curl

# global scripts
RUN npm install react-scripts@3.0.1 -g --silent

RUN addgroup -S mobiliti && \
    adduser -S mobiliti -G mobiliti -h /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=mobiliti:mobiliti . .

EXPOSE 8080 6006