FROM node:15.14-buster-slim as base

WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm install

FROM node:15.14-buster-slim as prod

WORKDIR /app

COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . /app

ENV NODE_ENV=production

RUN chmod +x build.prod.js
RUN ./build.prod.js

USER root

EXPOSE 5000

CMD ["node", "dist/index.js"]

FROM node:lts-alpine@sha256:bdec2d4aa13450a2e2654e562df1d8a3016b3c4ab390ccd3ed09d861cbdb0d83 as dev

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

WORKDIR /app/main
COPY . .
# hack node-gyp error
RUN npm install sharp

ENV NODE_ENV=development

RUN chmod +x ./build.js

EXPOSE 5000

USER root

CMD [ "./build.js" ]