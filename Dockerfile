FROM node:10-alpine

RUN apk --no-cache add -U netcat-openbsd curl

RUN addgroup -S mobiliti && \
    adduser -S mobiliti -G mobiliti -h /app

WORKDIR /app
USER mobiliti

COPY --chown=mobiliti:mobiliti . .

RUN npm install

EXPOSE 8080 6006
