FROM node:latest

WORKDIR /.output

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "yarn && yarn start"]
