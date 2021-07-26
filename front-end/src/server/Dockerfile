# Build client-react 
FROM node:alpine AS builder-client
WORKDIR /app
COPY src/client-react/package.json . 
RUN npm install
COPY src/client-react/ .
RUN npm run build

# NGINX static server
FROM nginx
ARG BUILD_NUMBER: 0
ARG BUILD_TAG: local
LABEL build_tag=${BUILD_TAG}
LABEL build_number=${BUILD_NUMBER}
EXPOSE 80
COPY --from=builder-client /app/build /usr/share/nginx/html
COPY src/server/nginx.conf /etc/nginx/nginx.conf 