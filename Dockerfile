FROM node:18-bullseye-slim

WORKDIR /app

COPY package.json /app

RUN set -eux; \
      dpkg --add-architecture i386; \
      apt update; \
      apt install wine64 wine32 mono-devel git -y; \
      yarn;

COPY ./ /app