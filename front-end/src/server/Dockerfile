FROM node:alpine AS builder-client
WORKDIR /app
COPY src/client-react/package.json . 
RUN npm install npm@7.18.1
RUN npm install
COPY src/client-react/ .
RUN npm run build

FROM node:alpine
EXPOSE 8080
WORKDIR /app
COPY src/server/package.json . 
RUN npm install npm@7.18.1
RUN npm install
COPY --from=builder-client /app/build ./build
COPY src/server/src/server.js .
CMD node server.js 