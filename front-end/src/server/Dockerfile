FROM node:alpine AS builder-client
WORKDIR /app
COPY src/client-react/package.json . 
RUN npm install
COPY src/client-react/ .
RUN npm run build

FROM node:alpine

ARG BUILD_NUMBER: 0
ARG BUILD_TAG: local

LABEL build_tag=${BUILD_TAG}
LABEL build_number=${BUILD_NUMBER}

EXPOSE 8080
WORKDIR /app
COPY src/server/package.json . 
RUN npm install
COPY --from=builder-client /app/build ./build
COPY src/server/src/server.js .
CMD node server.js 