FROM nginx as base

FROM base as dev
COPY nginx/dev/ /etc/

FROM base as prod
COPY nginx/prod/ /etc/
