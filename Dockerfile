FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 3333

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]
