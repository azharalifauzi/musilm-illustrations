FROM node:15.14-buster-slim as base

WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm install

FROM node:15.14-buster-slim as prod

WORKDIR /app

COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . /app

ENV NODE_ENV=production

RUN chmod +x build.js
RUN ./build.js

USER node

EXPOSE 5000

CMD ["node", "dist/index.js"]

FROM node:15.14-buster-slim as dev

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

WORKDIR /app/main
COPY . .

ENV NODE_ENV=development

RUN chmod +x ./build.js

EXPOSE 5000

USER root

CMD [ "./build.js" ]