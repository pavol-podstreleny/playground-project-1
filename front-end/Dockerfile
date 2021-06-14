FROM node AS builder-stage
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm","start"]